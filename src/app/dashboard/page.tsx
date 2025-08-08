import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';

const NewButton = () => {return <button className="py-8">Click.</button>}

const Chart = () => {
    return (
        <LineChart 
            xAxis={[{ data: [1,2,3,5,8,10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 15]
                },
                {
                    data: [null, null, 2, 6.5, 8.5, 9]
                },
                {
                    data: [1, 3.5, 2.5, 4]
                }
            ]}
            height={300}
            margin={{ bottom: 10 }}
            grid={{ vertical: true, horizontal: true }}
        />
    )
}

export default function Dashboard(){
    return <div className="grid items-center">
        <div className="py-4">Hello World!.</div>
        <div>
        <NewButton />
        </div>
        <div>
            <Chart/>
        </div>
    </div>
}