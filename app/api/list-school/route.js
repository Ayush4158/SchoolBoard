import { NextResponse } from "next/server";
import School from "@/model/school";
import { connectionToDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const file = formData.get("file");



    if(!formData){
      return NextResponse.json(
        {error: "Form is not field properly"},
        {status: 400}
      )
    }

    if(!file){
      return NextResponse.json(
        {error: "No image is uploaded"},
        {status: 400}
      )
    }

    if ([name, email, address, city, state, contact, file].some(field => field.toString().trim() === "")) {
      return NextResponse.json(
        { error: "All the fields are required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "nextjs_uploads" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      Readable.from(buffer).pipe(stream);
    });

    await connectionToDB();
    
    const existingListing = await School.findOne({ $or: [{ email }, { contact }] });

    if (existingListing) {
      return NextResponse.json(
        { error: "Entry with same email or contact already exists" },
        { status: 400 }
      );
    }


    const school = await School.create({
      name,
      email,
      address,
      city,
      state,
      contact,
      image : uploadResult.secure_url,
    });

    console.log(school)

    if (!school) {
      return NextResponse.json(
        { error: "Something went wrong while listing the school" },
        { status: 500 }
      );
    }

    return NextResponse.json(school, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(){
  try {
    await connectionToDB()

    const listing = await School.find()

    if (listing.length === 0) {
      return NextResponse.json(
        { message: "No schools found" },
        { status: 200 }
      );
    }


    return NextResponse.json(
      listing,
      {status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { error: error?.message },
      { status: 500 }
    );
  }
}
