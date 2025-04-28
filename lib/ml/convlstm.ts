// ConvLSTM model implementation for crime prediction
// This is a simplified version that would interface with a Python backend in production

import * as tf from "@tensorflow/tfjs"

// Define the ConvLSTM model architecture
export async function createConvLSTMModel(gridSize = [32, 32], timeSteps = 7) {
  // Load TensorFlow.js
  await tf.ready()

  // Create a sequential model
  const model = tf.sequential()

  // Add ConvLSTM2D layer
  model.add(
    tf.layers.conv2d({
      inputShape: [timeSteps, gridSize[0], gridSize[1], 1],
      filters: 64,
      kernelSize: [3, 3],
      padding: "same",
      activation: "relu",
      returnSequences: true,
    }),
  )

  // Add BatchNormalization
  model.add(tf.layers.batchNormalization())

  // Add another ConvLSTM2D layer
  model.add(
    tf.layers.conv2d({
      filters: 64,
      kernelSize: [3, 3],
      padding: "same",
      activation: "relu",
      returnSequences: false,
    }),
  )

  // Add BatchNormalization
  model.add(tf.layers.batchNormalization())

  // Add output layer
  model.add(
    tf.layers.conv2d({
      filters: 1,
      kernelSize: [3, 3],
      padding: "same",
      activation: "sigmoid",
    }),
  )

  // Compile the model
  model.compile({
    optimizer: "adam",
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  })

  return model
}

// Create crime grid from incidents
export function createCrimeGrid(incidents, gridSize = [32, 32], latRange = [19.0, 19.3], lonRange = [72.8, 73.1]) {
  // Create empty grid
  const grid = Array(gridSize[0])
    .fill()
    .map(() => Array(gridSize[1]).fill(0))

  // Map each crime to a grid cell
  incidents.forEach((incident) => {
    const lat = incident.latitude
    const lon = incident.longitude

    // Skip if outside the range
    if (lat < latRange[0] || lat > latRange[1] || lon < lonRange[0] || lon > lonRange[1]) {
      return
    }

    // Calculate grid indices
    const latIdx = Math.floor(((lat - latRange[0]) / (latRange[1] - latRange[0])) * (gridSize[0] - 1))
    const lonIdx = Math.floor(((lon - lonRange[0]) / (lonRange[1] - lonRange[0])) * (gridSize[1] - 1))

    // Increment the count in the grid cell
    grid[latIdx][lonIdx] += 1
  })

  return grid
}

// Create sequences for ConvLSTM input
export function createSequences(grids, sequenceLength = 7) {
  const X = []
  const y = []

  for (let i = 0; i < grids.length - sequenceLength; i++) {
    // Input sequence
    X.push(grids.slice(i, i + sequenceLength))

    // Target grid (next time step after the sequence)
    y.push(grids[i + sequenceLength])
  }

  // Convert to tensors
  const inputTensor = tf.tensor4d(X)
  const targetTensor = tf.tensor3d(y)

  return { inputTensor, targetTensor }
}

// Train the model
export async function trainModel(model, inputTensor, targetTensor, epochs = 10, batchSize = 16) {
  return await model.fit(inputTensor, targetTensor, {
    epochs,
    batchSize,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.accuracy}`)
      },
    },
  })
}

// Generate predictions
export async function generatePredictions(model, inputSequence) {
  const prediction = model.predict(inputSequence)
  return prediction.arraySync()
}
