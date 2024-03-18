
"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PieChart, Pie, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, FunnelChart, Funnel, LabelList } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const page = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        width: '95%',
        backgroundColor: '#f0f0f0',
        paddingTop: '65px',
        borderRadius: '190px',
      };
        const leadsData = [
          {
            name: "John Doe",
            email: "johndoe@example.com",
            contactNumber: "+1234567890",
            status: "Potential",
          },
          {
            name: "Jane Doe",
            email: "janedoe@example.com",
            contactNumber: "+9876543210",
            status: "Qualified",
          },
          {
            name: "Peter Jones",
            email: "peterjones@example.com",
            contactNumber: "+0987654321",
            status: "Closed",
          },
        ];
    const data1 = [
        {
            "value": 100,
            "name": "Lead1",
            "fill": "#8884d8"
        },
        {
            "value": 80,
            "name": "Lead2",
            "fill": "#83a6ed"
        },
        {
            "value": 50,
            "name": "Lead3",
            "fill": "#8dd1e1"
        },
        {
            "value": 40,
            "name": "Lead4",
            "fill": "#82ca9d"
        },
        {
            "value": 26,
            "name": "Lead5",
            "fill": "#a4de6c"
        }
    ]

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];
    return (
      <div style={containerStyle}>
        <div className="row">
          <div className="col-md-6">
            <PieChart
              width={300}
              height={250}
              style={{ backgroundColor: "white" }}
            >
              <Pie data={data01} dataKey="value" nameKey="name" fill="#884d8" />
              {/* <Pie data={data02} dataKey="value" nameKey="name"  innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
            </PieChart>
          </div>
          <div className="col-md-6">
            <PieChart
              width={300}
              height={250}
              style={{ backgroundColor: "white" }}
            >
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell>Email</TableCell>

                  <TableCell>Contact Number</TableCell>

                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leadsData.map((lead) => (
                  <TableRow key={lead.name}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.contactNumber}</TableCell>
                    <TableCell>{lead.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <FunnelChart width={730} height={250}>
                        <Tooltip />
                        <Funnel
                            dataKey="value"
                            data={data1}
                            isAnimationActive>
                            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                        </Funnel>
                    </FunnelChart> */}
          {/* <AreaChart width={730} height={250} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart> */}
        </div>
      </div>
    );
};

export default page;