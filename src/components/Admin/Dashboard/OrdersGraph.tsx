import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import { ordersDataConvertingToMap } from './dataFetchers.ts';

const OrdersGraph = () => {
  const data = ordersDataConvertingToMap();

  return (
    <div className='order-1 m-2 max-h-screen min-h-full rounded border md:w-[40vw]'>
      <h1 className=' mt-4 text-center text-2xl'>Orders</h1>
      <VictoryChart
        theme={VictoryTheme.material}
        height={500}
        width={1000}
        padding={{ top: 50, left: 160, right: 100, bottom: 100 }}
      >
        <VictoryAxis
          tickValues={data?.map(
            (_: { x: string; y: number }, index: number) => {
              return index + 1;
            }
          )}
          tickFormat={data?.map((obj: { x: string; y: number }) => {
            return `${obj.x}`;
          })}
          style={{
            axisLabel: {
              fontSize: 20,
            },
          }}
          label='Orders for the corresponding dates'
          axisLabelComponent={<VictoryLabel dy={30} style={{ fontSize: 25 }} />}
          tickLabelComponent={<VictoryLabel dy={5} />}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x} units`}
          label={() => ['Number of units', ' on that particular date']}
          style={{
            tickLabels: { fill: '#000000', fontSize: 15 },
          }}
          axisLabelComponent={
            <VictoryLabel dy={-70} style={{ fontSize: 25 }} />
          }
        />
        <VictoryLine
          x='x'
          y='y'
          style={{ data: { stroke: '#000000' } }}
          data={data}
        />
      </VictoryChart>
    </div>
  );
};
export default OrdersGraph;
