import { NextRequest, NextResponse } from "next/server";

const URLS: Record<string, any> = {
  Today: {
    NewUser:
      "http://dashboard.autoair.xyz/public/question/344ef7aa-40ba-401e-87dc-f734f545871e.json",
    CreatedWallet:
      "http://dashboard.autoair.xyz/public/question/267f1fda-204c-4bba-a496-c9093ecf096d.json",
    WalletWithBalance:
      "http://dashboard.autoair.xyz/public/question/9ef6073f-0c69-4e5d-8635-ece0f355d589.json",
  },
  Week: {
    NewUser:
      "http://dashboard.autoair.xyz/public/question/ccd36d11-dd9b-4cae-bdfb-f58dbf37c3d6.json",
    CreatedWallet:
      "http://dashboard.autoair.xyz/public/question/ee18c314-8058-4751-99be-89ed4722c07c.json",
    WalletWithBalance:
      "http://dashboard.autoair.xyz/public/question/d5a18841-dd17-4937-9836-76a859831baa.json",
  },
  Month: {
    NewUser:
      "http://dashboard.autoair.xyz/public/question/28c9fdc1-d88f-45c9-a428-7a9c12dc61e7.json",
    CreatedWallet:
      "http://dashboard.autoair.xyz/public/question/4cf780d7-af64-463d-b85a-abbfdaa888db.json",
    WalletWithBalance:
      "http://dashboard.autoair.xyz/public/question/4180614e-d0a4-4d3e-bab1-d8a73c5685b6.json",
  },
};

export async function GET(request: NextRequest) {
  const params = request.url?.split("?").at(1);

  const urlDailyNewUsers = fetch(URLS[params ?? ""].NewUser);

  const urlDailyCreatedWallets = fetch(URLS[params ?? ""].CreatedWallet);

  const urlWalletWithBalance = fetch(URLS[params ?? ""].WalletWithBalance);

  const [resDailyNewUsers, resDailyCreatedWallets, resWalletWithBalance] =
    await Promise.all([
      urlDailyNewUsers,
      urlDailyCreatedWallets,
      urlWalletWithBalance,
    ]);

  if (
    resDailyNewUsers.status !== 200 ||
    resDailyCreatedWallets.status !== 200 ||
    resWalletWithBalance.status !== 200
  ) {
    return NextResponse.json({ message: "Error " }, { status: 500 });
  }

  const dataDailyNewUsers = await resDailyNewUsers.json();
  const dataDailyCreatedWallets = await resDailyCreatedWallets.json();
  const dataWalletWithBalance = await resWalletWithBalance.json();

  return NextResponse.json(
    {
      data: {
        dataDailyNewUsers,
        dataDailyCreatedWallets,
        dataWalletWithBalance,
      },
    },
    { status: 200 }
  );
}
