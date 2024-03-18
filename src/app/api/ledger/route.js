// import formidable from 'formidable';
// import Ledger from '../../models/ledger';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = '../../../public/uploads';
//     form.keepExtensions = true;
//     form.multiples = true;

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Something went wrong during file upload' });
//         return;
//       }

//       const ledger = new Ledger({
//         ledgerName: fields.ledgerName,
//         description: fields.description,
//         amount: fields.amount,
//         transactionImages: files.transactionImage.map(file => file.path),
//       });

//       const result = await ledger.save();
//       res.status(201).json({ message: 'Ledger created successfully', result });
//     });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

import connectMongoDB from "../../../../config/dbConnect";
import Ledger from "../../models/ledger";
import { NextResponse } from "next/server";

export async function POST(request) {
  const form = new formidable.IncomingForm();
  const {
    ledgerName,
    description,
    amount,
    transactionImage,
  } = await request.json();
  await connectMongoDB();

  await Ledger.create({
  
    ledgerName,
    description,
    amount,
    transactionImage,
  });
  console.log(
    ledgerName,
    description,
    amount,
    transactionImage,
    );
  return NextResponse.json({ message: "Ledger Created Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Ledger = await Ledger.find();
  console.log(Ledger);
  return NextResponse.json({ Ledger });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Ledger.findByIdAndDelete(id);
  return NextResponse.json({ message: "Ledger deleted" }, { status: 201 });
}
