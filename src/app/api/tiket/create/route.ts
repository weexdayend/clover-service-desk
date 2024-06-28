import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateTicketId(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const {
      userName,
      userNIK,
      userPhone,
      infoStart,
      infoEnd,
      infoDesc,
      listItems,
      userSerial,
      userCSM,
      userKategori,
      userType,
      userMerek,
      kategoriPeminjaman
    } = await req.json();

    await prisma.$transaction(async (tx) => {
      const newTicket = await tx.tbl_peminjaman.create({
        data: {
          tiket: 'IS-' + generateTicketId(10),
          tanggal_peminjaman: infoStart,
          tanggal_pengembalian: infoEnd,
          nik_peminjam: userNIK,
          nama_peminjam: userName,
          kontak_peminjam: userPhone,
          status_peminjaman: 'open',
          keterangan_peminjaman: infoDesc,
          kategori_peminjaman: kategoriPeminjaman,
        },
        select: {
          tiket: true
        }
      })

      await tx.tbl_list_peminjaman.createMany({
        data: listItems.map((item: any) => ({
          tiket: newTicket.tiket,
          catatan_peminjaman: item.addon,
          sn_perangkat: item.sn_perangkat,
        }))
      })

      await tx.inventory_perangkat.updateMany({
        where: {
          sn_perangkat: {
            in: listItems.map((item: any) => item.sn_perangkat)
          }
        },
        data: {
          status_perangkat: 'not-available'
        }
      })

      if (kategoriPeminjaman === 'backup') {
        await tx.perangkat_user.create({
          data: {
            serial_perangkat: userSerial,
            csm_perangkat: userCSM,
            kategori_perangkat: userKategori,
            type_perangkat: userType,
            merek_perangkat: userMerek,
            status_perangkat: 'open',
            tiket: newTicket.tiket
          }
        })
      }
    })

    return new Response(JSON.stringify({ message: 'Create ticket successful' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong! Please try again.' }), { status: 500 });
  }
}
