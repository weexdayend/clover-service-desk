import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { tiket } = await req.json();

    if (!tiket) {
      return new Response(
        JSON.stringify({ message: 'Missing tiket parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch data from the database
    const perangkatPeminjaman = await prisma.tbl_list_peminjaman.findMany({
      where: {
        tiket: tiket,
      },
    });

    // Extract sn_perangkat values
    const snPerangkatList = perangkatPeminjaman.map(item => item.sn_perangkat);

    // Fetch data from the inventory_perangkat table
    const inventoryData = await prisma.inventory_perangkat.findMany({
      where: {
        sn_perangkat: {
          in: snPerangkatList,
        },
      },
    });

    const mergedData = inventoryData.map(inventoryItem => {
      const peminjamanItem = perangkatPeminjaman.find(peminjaman => peminjaman.sn_perangkat === inventoryItem.sn_perangkat);
      return {
        ...inventoryItem,
        catatan_peminjaman: peminjamanItem?.catatan_peminjaman || null,
      };
    });

    const perangkatUser = await prisma.perangkat_user.findMany({
      where: {
        tiket: tiket,
      },
    });

    // Return the response with the fetched data
    return new Response(
      JSON.stringify({ peminjaman: mergedData, perbaikan: perangkatUser }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);

    // Return an error response
    return new Response(
      JSON.stringify({ message: 'Something went wrong! Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
