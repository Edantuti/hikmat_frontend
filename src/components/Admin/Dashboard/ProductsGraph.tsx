import { productsDataConvertingtoMap } from './dataFetchers';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory';
const ProductsGraph = () => {
  const data = productsDataConvertingtoMap();
  return (
    <>
      <div className='order-3 m-2 h-[98%] rounded border md:w-[40vw]'>
        <h1 className='mt-4 text-center text-2xl'>Products</h1>
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={800}
          padding={{ top: 100, left: 100, bottom: 100, right: 100 }}
        >
          <VictoryAxis
            label='Products'
            axisLabelComponent={<VictoryLabel style={{ fontSize: 25 }} />}
            tickLabelComponent={<VictoryLabel dy={10} style={{ opacity: 0 }} />}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x} units`}
            label={() => ['Number of units sold']}
            axisLabelComponent={
              <VictoryLabel dy={-40} style={{ fontSize: 15 }} />
            }
          />
          <VictoryBar
            alignment='start'
            x='x'
            y='y'
            labels={({ datum }) => datum.xName}
            style={{ labels: { fill: 'black' }, data: { fill: 'black' } }}
            data={data}
          />
        </VictoryChart>
      </div>
    </>
  );
};

export default ProductsGraph;
