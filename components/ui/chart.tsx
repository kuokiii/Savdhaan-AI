import type React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip,
  type TooltipProps,
} from "recharts"

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export const LineChart = ({
  data,
  children,
}: {
  data: any[]
  children: React.ReactNode
}) => {
  return <RechartsLineChart data={data}>{children}</RechartsLineChart>
}

export const Line = ({
  dataKey,
  stroke,
  strokeWidth,
  dot,
}: { dataKey: string; stroke: string; strokeWidth: number; dot: any }) => {
  return <RechartsLine type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} dot={dot} />
}

export const XAxis = ({ dataKey }: { dataKey: string }) => {
  return <RechartsXAxis dataKey={dataKey} />
}

export const YAxis = () => {
  return <RechartsYAxis />
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <Tooltip content={children} />
}

export const ChartTooltipContent = ({
  className,
  content,
}: { className?: string; content: (props: TooltipProps<any, any>) => React.ReactNode | null }) => {
  return <div className={className}>{content({} as TooltipProps<any, any>)}</div>
}
