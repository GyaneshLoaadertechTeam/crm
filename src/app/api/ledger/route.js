import connectMongoDB from "../../../../config/dbConnect";
import Ledger from '../../models/ledger';
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const formData = await request.formData();
  const ledgerName = formData.get('ledgerName');
  const description = formData.get('description');
  const amount = formData.get('amount');
  const transactionImageFile = formData.get('transactionImage');

  // Save the file to the assets folder and get the file path
  const assetsFolderPath = path.join(process.cwd(), 'assets');
  if (!fs.existsSync(assetsFolderPath)) {
    fs.mkdirSync(assetsFolderPath);
  }
  const filePath = path.join(assetsFolderPath, transactionImageFile.name);
  // Use arrayBuffer() to get the file contents
  const fileBuffer = await transactionImageFile.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(fileBuffer));

  const transactionImagePath = `assets/${transactionImageFile.name}`;

  await connectMongoDB();
  await Ledger.create({
  
    ledgerName,
    description,
    amount,
    transactionImage : transactionImagePath,
  });

  return NextResponse.json({ message: 'Ledger Created Successfully' }, { status: 201 });
}

// export async function GET() {
//   await connectMongoDB();
//   const Ledger = await Ledger.find();
//   console.log(Ledger);
//   return NextResponse.json({ Ledger });
// }

export async function GET() {
  await connectMongoDB();
  const ledgers = await Ledger.find();

  // Assuming your server is hosted at 'http://localhost:3000'
  const serverUrl = 'http://localhost:3000/';

  const ledgersWithFileUrls = ledgers.map(ledger => {
    if (ledgers.transactionImage) {
      // Construct the full URL for the profile photo
      ledger.transactionImage = `${serverUrl}${ledgers.transactionImage}`;
    }
    return ledgers;
  });

  return NextResponse.json({ ledgers });
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Ledger.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Ledger deleted" }, { status: 201 });
// }
