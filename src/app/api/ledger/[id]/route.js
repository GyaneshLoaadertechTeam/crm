import connectMongoDB from "../../../../../config/dbConnect";
import Ledger from '../../../models/ledger';
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const ledgers = await Ledger.findOne({ _id: id });
    return NextResponse.json({ ledgers }, { status: 200 });
  }

  export async function PUT(request, { params }) {
    const { id } = params;
    const data = await request.json();
    console.log(data);
  
    await connectMongoDB();
        const response=await Ledger.findByIdAndUpdate(id, {
        ledgerName: data.ledgerName,
        amount: data.amount,
        description: description.email,
        transactionImage: data.transactionImage,
 
    }, { new: true });
  
  
    return NextResponse.json({ message: "Leadger Updated Successfully" }, { status: 201 });
  }