import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  ThermometerIcon,
  ZapIcon,
  GlobeIcon,
  PlusIcon
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <Card>
        <CardHeader className="relative">
          <CardDescription>Global CO2 Emissions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            427.2 ppm
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="destructive" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +2.1/year
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
            Above safe levels <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Current atmospheric concentration
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="relative">
          <CardDescription>Renewable Energy Capacity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            3,372 GW
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="default" className="flex gap-1 rounded-lg text-xs bg-green-600">
              <PlusIcon className="size-3" />
              +260 GW
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            Rapid growth this year <ZapIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Clean energy installations
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="relative">
          <CardDescription>Net-Zero Commitments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            73 Countries
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="default" className="flex gap-1 rounded-lg text-xs bg-blue-600">
              <PlusIcon className="size-3" />
              +12 new
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-600">
            Growing commitment <GlobeIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Carbon neutrality pledges</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="relative">
          <CardDescription>Global Temperature Anomaly</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            +1.2°C
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="destructive" className="flex gap-1 rounded-lg text-xs">
              <ThermometerIcon className="size-3" />
              +0.18°C/decade
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
            Critical warming trend <ThermometerIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Above 1880-1920 average</div>
        </CardFooter>
      </Card>
    </div>
  )
}
