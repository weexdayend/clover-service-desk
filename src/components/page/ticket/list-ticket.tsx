"use client"

import axios from 'axios'
import React, { useState, useMemo, useCallback, useEffect } from 'react'

import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Textarea,
  DateInput,
} from '@nextui-org/react'

import { 
  Combobox, 
  ComboboxButton, 
  ComboboxInput, 
  ComboboxOption, 
  ComboboxOptions 
} from '@headlessui/react'

import {
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  CheckCheckIcon,
  LucideInfo,
  PhoneIcon,
  TimerIcon,
  LinkIcon,
  Trash2Icon,
  CheckIcon,
  XCircleIcon,
} from 'lucide-react'

import {
  statusOptions,
  peminjaman,
  CategoryHadrware
} from '@/types/example-ticket-data'

import { CalendarDate } from "@internationalized/date";

import {
  capitalize
} from '@/utils/utils'

type Props = {}

interface SelectedTicket {
  id: number;
  tiket: string;
  nik_peminjam: number;
  nama_peminjam: string;
  kontak_peminjam: string;
  status_peminjaman: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
  keterangan_peminjaman: string;
  kategori_peminjaman: string;
}

interface ListItemsProps {
  id_perangkat?: number;
  sn_perangkat?: string;
  csm_perangkat?: string;
  kategori_perangkat?: string;
  type_perangkat?: string;
  merek_perangkat?: string;
  use_perangkat?: string;
  status_perangkat?: string;
  addon?: string;
}

interface ListInventoryProps {
  id_perangkat: number;
  sn_perangkat: string;
  csm_perangkat: string;
  kategori_perangkat: string;
  type_perangkat: string;
  merek_perangkat: string;
  use_perangkat: string;
  status_perangkat: string;
}

interface BodyProps {
  userName: string;
  userNIK: string;
  userPhone: string;
  infoStart?: string;
  infoEnd?: string;
  infoDesc: string;
  listItems: ListItemsProps[];
  userSerial?: string;
  userCSM?: string;
  userKategori?: string;
  userType?: string;
  userMerek?: string;
  kategoriPeminjaman: string;
}

function ListTicket({}: Props) {
  const [inventoryItems, setInventoryItems] = useState<ListInventoryProps[]>([]);
  const [tiketItems, setTicketItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoryResponse, tiketResponse] = await Promise.all([
          axios.get('/api/inventory'),
          axios.get('/api/tiket/all') // Replace with other API endpoint if needed
        ]);

        setInventoryItems(inventoryResponse.data.data);
        setTicketItems(tiketResponse.data.data); // Set other data if needed
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [openTiket, setOpenTiket] = useState<boolean>(false)
  const [selectedTiket, setSelectedTiket] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<SelectedTicket>()

  const [createNew, setCreateNew] = useState<boolean>(false)

  const [userName, setUserName] = useState<string>('')
  const [userNIK, setUserNIK] = useState<string>('')
  const [userPhone, setUserPhone] = useState<string>('')

  const [infoStart, setInfoStart] = useState<CalendarDate | null>(null);
  const [infoEnd, setInfoEnd] = useState<CalendarDate | null>(null);
  const [infoDesc, setInfoDesc] = useState<string>('')

  const [deviceSerial, setDeviceSerial] = useState<any>()
  const [deviceAddOn, setDeviceAddOn] = useState<string>('')

  const [userSerial, setUserSerial] = useState('')
  const [userCSM, setUserCSM] = useState('')
  const [userKategori, setUserKategori] = useState('')
  const [userType, setUserType] = useState('')
  const [userMerek, setUserMerek] = useState('')

  const [listItems, setListItems] = useState<ListItemsProps[]>([])

  const [alertPeminjaman, setAlertPeminjaman] = useState<boolean>(false)

  const handleAddItem = () => {
    if (deviceSerial && deviceAddOn && kategoriPeminjaman == 'backup' && listItems.length === 1) {
      setDeviceSerial('')
      setDeviceAddOn('')
      return setAlertPeminjaman(true)
    }

    if (deviceSerial && deviceAddOn) {
      setListItems([...listItems, { ...deviceSerial, addon: deviceAddOn }]);
      setDeviceSerial('');
      setDeviceAddOn('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  const closeAlertPeminjaman = () => {
    setAlertPeminjaman(false)
  } 

  const [filterValue, setFilterValue] = useState<any>("")
  const [statusFilter, setStatusFilter] = useState<any>("all")
  const [rowsPerPage, setRowsPerPage] = useState<any>(5)
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    let filteredUsers = [...tiketItems];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [tiketItems, filterValue, statusFilter]);

  const filteredInventory = useMemo(() => {
    let filteredUsers = [...inventoryItems];

    filteredUsers = filteredUsers.filter(
      (user) => 
        user.status_perangkat === "available" &&
        !listItems.some(listItem => listItem.sn_perangkat === user.sn_perangkat)
    );

    filteredUsers = query === '' ? filteredUsers : filteredUsers.filter((person: any) => {
      return person.sn_perangkat.toLowerCase().includes(query.toLowerCase())
    })

    return filteredUsers;
  }, [inventoryItems, listItems, query]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const openTicket = (item: any, str: any) => {
    setOpenTiket(!openTiket);
    setSelectedTiket(str);
    setSelectedItem(item)
  }

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  const closeTicket = () => {
    setCreateNew(false);
    setOpenTiket(false);
    setSelectedTiket(null);

    setPerangkatPeminjaman([])
    setPerangkatUser([])
  }

  const handleSubmitTicket = async () => {
    const body: BodyProps = {
      userName,
      userNIK,
      userPhone,
      infoDesc,
      listItems,
      kategoriPeminjaman,
    }

    if (kategoriPeminjaman === 'peminjaman' && infoStart && infoEnd) {
      body.infoStart = `${infoStart.year}-${infoStart.month}-${infoStart.day}`;
      body.infoEnd = `${infoEnd.year}-${infoEnd.month}-${infoEnd.day}`;
    }

    if (kategoriPeminjaman === 'backup' && infoStart) {
      body.infoStart = `${infoStart.year}-${infoStart.month}-${infoStart.day}`;
      body.userSerial = userSerial;
      body.userCSM = userCSM;
      body.userKategori = userKategori;
      body.userType = userType;
      body.userMerek = userMerek;
    }

    axios.post('/api/tiket/create', body)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const [perangkatPeminjaman, setPerangkatPeminjaman] = useState<any[]>([])
  const [perangkatUser, setPerangkatUser] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiketResponse] = await Promise.all([
          axios.post(`/api/tiket/get-perangkat`, { tiket: selectedTiket })
        ]);

       const dataTiket = tiketResponse.data;

        setPerangkatPeminjaman(dataTiket.peminjaman);
        setPerangkatUser(dataTiket.perbaikan);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedTiket) {
      fetchData();
    }
  }, [selectedTiket]);

  const [kategoriPeminjaman, setKategoriPeminjaman] = useState<string>('')

  if (createNew === true) return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row w-full items-center gap-4'>
        <div onClick={() => closeTicket()} className='p-2 active:scale-95 rounded-md cursor-pointer'>
          <ArrowLeftIcon size={20} />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold text-inherit'>Ticket</h1>
          <h1 className='text-sm text-white/70 -mt-2'>Create new ticket.</h1>
        </div>
      </div>
      <div className='grid grid-cols-2 w-full items-center gap-4 pt-6 px-6 py-6'>
        <Button 
          onClick={() => setKategoriPeminjaman('peminjaman')}
          className={`${kategoriPeminjaman == 'peminjaman' && 'bg-blue-500'}`}
        >          
          <h1>Peminjaman</h1>
        </Button>
        <Button 
          onClick={() => setKategoriPeminjaman('backup')}
          className={`${kategoriPeminjaman == 'backup' && 'bg-blue-500'}`}
        >
          <h1>Backup</h1>
        </Button>
      </div>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full grid grid-cols-3 gap-4 px-6 py-6'>
          <div className='col-span-3'>
            <h1>User Information</h1>
          </div>
          <Input
            type="text" 
            label="Full Name"
            className="max-w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input 
            type="text" 
            label="NIK"
            className="max-w-full"
            value={userNIK}
            onChange={(e) => setUserNIK(e.target.value)}
          />
          <Input 
            type="text" 
            label="Phone"
            className="max-w-full"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
        <div className='w-full grid grid-cols-3 gap-4 px-6 py-6'>
          <div className='col-span-3'>
            <h1>Application Information</h1>
          </div>
          <DateInput 
            label={"Start date"} 
            placeholderValue={new CalendarDate(1995, 11, 6)} 
            className="max-w-full"
            value={infoStart}
            onChange={setInfoStart}
          />
          {
            kategoriPeminjaman == 'peminjaman' && (
              <DateInput 
                label={"End date"} 
                placeholderValue={new CalendarDate(1995, 11, 6)} 
                className="max-w-full" 
                value={infoEnd}
                onChange={setInfoEnd}
              />
            )
          }
          <Textarea
            label="Description"
            className="max-w-full col-span-3"
            value={infoDesc}
            onChange={(e) => setInfoDesc(e.target.value)}
          />
        </div>
        <div className='w-full grid grid-cols-4 gap-4 px-6 py-6 items-center'>
          <div className='col-span-4'>
            <h1>Hardware {kategoriPeminjaman == 'backup' && 'Backup'} Information</h1>
          </div>
          {
            alertPeminjaman && (
              <div onClick={() => closeAlertPeminjaman()} className='col-span-4 w-full h-fit flex flex-row items-center justify-between px-6 py-2 rounded-xl bg-rose-500'>
                <h1>Backup tidak boleh lebih dari 1.</h1>
                <div className='p-4 cursor-pointer'>
                  <XCircleIcon size={24} />
                </div>
              </div>
            )
          }
          <Combobox 
            value={deviceSerial} 
            onChange={(e: any) => setDeviceSerial(e)} 
            onClose={() => setQuery('')}
          >
            <div className="relative">
              <ComboboxInput
                placeholder="Serial Number"
                className='w-full rounded-xl border-none bg-zinc-800 py-4 pr-8 pl-3 text-sm/6 text-white
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                displayValue={(person: any) => person?.sn_perangkat}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <ComboboxOptions
              anchor="bottom"
              transition
              className='scrollbar-hide max-h-40 z-50 w-[var(--input-width)] rounded-xl bg-zinc-900 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible
                transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            >
              {filteredInventory && filteredInventory.map((person) => (
                <ComboboxOption
                  key={person.sn_perangkat}
                  value={person}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 text-white">{person.sn_perangkat}</div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
          <div className='flex flex-row items-center w-full h-full col-span-2 gap-4'>
            <Input 
              type="text" 
              label="Add-on"
              className="flex-1 w-full"
              value={deviceAddOn}
              onChange={(e) => setDeviceAddOn(e.target.value)}
            />
            <div
              onClick={() => handleAddItem()}
              className='h-full px-4 flex cursor-pointer active:scale-95 items-center rounded-xl w-fit bg-zinc-800
            '>
              <PlusCircleIcon size={24} className='text-white' />
            </div>
          </div>
          {
            listItems.map((item: ListItemsProps, index: number) => (
              <div
                key={index}
                className={`
                  w-full col-span-4 min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 grid grid-cols-5 items-center
                `}
              >
                <Chip>{item.sn_perangkat}</Chip>
                <div className='flex flex-col'>
                  <h1 className='font-bold text-md'>{item.csm_perangkat}</h1>
                  <h1 className='text-xs text-white/60'>{item.kategori_perangkat}</h1>
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-bold text-md'>{item.merek_perangkat}</h1>
                  <h1 className='text-xs text-white/60'>{item.type_perangkat}</h1>
                </div>
                <div className='flex flex-col'>
                  <h1>{item.addon}</h1>
                  <h1 className='text-xs text-white/60'>Add-on</h1>
                </div>
                <div className='w-full flex justify-end p-2'>
                  <div onClick={() => handleRemoveItem(index)} className='p-2 rounded-xl bg-red-500 cursor-pointer transition-all ease-linear hover:bg-red-600 active:scale-95'>
                    <Trash2Icon size={24} />
                  </div>
                </div>
              </div>
            ))
          }
          {
            kategoriPeminjaman == 'backup' && (
              <div className='col-span-4 w-full grid grid-cols-5 gap-4 pt-6'>
                <div className='col-span-5'>
                  <h1>Hardware User Information</h1>
                </div>
                <Input
                  type="text" 
                  label="Serial Number"
                  className="max-w-full"
                  value={userSerial}
                  onChange={(e) => setUserSerial(e.target.value)}
                />
                <Input
                  type="text" 
                  label="CSM"
                  className="max-w-full"
                  value={userCSM}
                  onChange={(e) => setUserCSM(e.target.value)}
                />
                <Input
                  type="text" 
                  label="Kategori"
                  className="max-w-full"
                  value={userKategori}
                  onChange={(e) => setUserKategori(e.target.value)}
                />
                <Input 
                  type="text" 
                  label="Type"
                  className="max-w-full"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <Input 
                  type="text" 
                  label="Merek"
                  className="max-w-full"
                  value={userMerek}
                  onChange={(e) => setUserMerek(e.target.value)}
                />
              </div>
            )
          }
        </div>
        <div className='w-full flex flex-row items-center justify-end gap-4 px-6 pt-14'>
          <Button
            variant='light'
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => handleSubmitTicket()}
          >
            Submit application
          </Button>
        </div>
      </div>
    </div>
  )

  if (openTiket === true && selectedItem) return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row w-full items-center gap-4'>
        <div onClick={() => closeTicket()} className='p-2 active:scale-95 rounded-md cursor-pointer'>
          <ArrowLeftIcon size={20} />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold text-inherit'>Ticket</h1>
          <h1 className='text-sm text-white/70 -mt-2'>Information.</h1>
        </div>
      </div>
      <div className='w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl'>
        <div className='relative flex flex-row items-center justify-between px-8 py-8 gap-2'>
          <div className='flex flex-col text-left gap-2'>
            <h1 className='text-base text-white/70'>User Information</h1>
            <h1 className='text-6xl font-bold'>{selectedItem.nama_peminjam}</h1>
            <div className='flex flex-row gap-2 items-center'>
              <Button
                variant='flat'
                startContent={<LucideInfo size={14} />}
              >
                {selectedItem.nik_peminjam}
              </Button>
              <Button
                variant='flat'
                startContent={<PhoneIcon size={14} />}
              >
                {selectedItem.kontak_peminjam}
              </Button>
            </div>
          </div>

          <div className='absolute top-8 right-8 flex flex-col gap-4'>
            <div className='flex flex-col items-center bg-white text-zinc-800 rounded-xl px-6 py-8 gap-4 shadow-lg'>
              {
                selectedItem.status_peminjaman === 'close' && (
                  <div className='flex flex-col items-center gap-4'>
                    <CheckCheckIcon size={42} className='text-green-500' />
                    <Chip color='success' className='capitalize'>{selectedItem.status_peminjaman}</Chip>
                  </div>
                )
              }
              {
                selectedItem.status_peminjaman === 'progress' && (
                  <div className='flex flex-col items-center gap-4'>
                    <TimerIcon size={42} className='text-amber-500' />
                    <Chip color='warning' className='capitalize'>{selectedItem.status_peminjaman}</Chip>
                  </div>
                )
              }
              {
                selectedItem.status_peminjaman === 'open' && (
                  <div className='flex flex-col items-center gap-4'>
                    <TimerIcon size={42} className='text-blue-400' />
                    <Chip color='default' className='capitalize'>{selectedItem.status_peminjaman}</Chip>
                  </div>
                )
              }
              <div className='px-4 py-2 text-center'>
                <h1 className='opacity-50 text-md capitalize'>{selectedItem.kategori_peminjaman}</h1>
                <h1 className='text-3xl font-bold'>{selectedTiket}</h1>
              </div>
              <div className='w-full flex flex-row items-center justify-between gap-8 px-4'>
                <div className='flex flex-col'>
                  <h1 className='text-md'>{selectedItem.tanggal_peminjaman}</h1>
                  <h1 className='text-xs text-zinc-800/50'>Peminjaman</h1>
                </div>
                {
                  selectedItem.kategori_peminjaman === 'peminjaman' && (
                    <div className='flex flex-col'>
                      <h1 className='text-md'>{selectedItem.tanggal_pengembalian}</h1>
                      <h1 className='text-xs text-zinc-800/50'>Pengembalian</h1>
                    </div>
                  )
                }
              </div>
            </div>
            <div className='flex flex-col bg-white text-zinc-800 rounded-xl px-6 py-8 gap-4 shadow-lg'>
              <h1 className='text-xs text-zinc-800/50'>Notes :</h1>
              <div className='max-w-[20vw] bg-gray-50 p-4 rounded-xl'>
                <h1 className='text-sm text-zinc-800/70'>{selectedItem.keterangan_peminjaman}</h1>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center cursor-pointer active:scale-95'>
                  <LinkIcon size={14} className='mr-2 text-blue-500' />
                  <h1 className='text-sm text-blue-500'>Evidence Penyerahan</h1>
                </div>
                <div className='flex flex-row items-center cursor-pointer active:scale-95'>
                  <LinkIcon size={14} className='mr-2 text-blue-500' />
                  <h1 className='text-sm text-blue-500'>Evidence Pengembalian</h1>
                </div>
              </div>
            </div>
            {
              selectedItem.status_peminjaman === 'close' && (
                <Button
                  color='success'
                  disabled
                >
                  Done
                </Button>
              )
            }
            {
              selectedItem.status_peminjaman === 'progress' && (
                <Button
                  color='warning'
                >
                  Close this ticket
                </Button>
              )
            }
            {
              selectedItem.status_peminjaman === 'open' && (
                <Button
                  color='default'
                >
                  Progress this ticket
                </Button>
              )
            }
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-3 py-6'>
        <div className='w-full col-span-2 flex flex-col gap-4'>
        <h1>Perangkat Peminjaman</h1>
        {perangkatPeminjaman.length > 0 && perangkatPeminjaman.map((item: any, index: number) => (
          <div
            key={index} 
            className={`
              w-full min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 grid grid-cols-4 items-center transition-all ease-linear hover:bg-zinc-800 active:scale-95 cursor-pointer
            `}
          >
            <Chip>{item.sn_perangkat}</Chip>
            <div className='flex flex-col'>
              <h1 className='text-base font-bold'>{item.csm_perangkat}</h1>
              <h1 className='text-sm'>{item.kategori_perangkat}</h1>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-base font-bold'>{item.merek_perangkat}</h1>
              <h1 className='text-sm'>{item.type_perangkat}</h1>
            </div>
            <h1 className='text-sm text-opacity-20'>{item.catatan_peminjaman}</h1>
          </div>
        ))}
        </div>
      </div>
      <div className='w-full grid grid-cols-3'>
        <div className='w-full col-span-2 flex flex-col gap-4'>
        {perangkatUser.length > 0 && <h1>Perangkat User</h1>}
        {perangkatUser.length > 0 && perangkatUser.map((item: any, index: number) => (
          <div
            key={index} 
            className={`
              w-full min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 grid grid-cols-4 items-center transition-all ease-linear hover:bg-zinc-800 active:scale-95 cursor-pointer
            `}
          >
            <Chip>{item.serial_perangkat}</Chip>
            <div className='flex flex-col'>
              <h1 className='text-base font-bold'>{item.csm_perangkat}</h1>
              <h1 className='text-sm'>{item.kategori_perangkat}</h1>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-base font-bold'>{item.merek_perangkat}</h1>
              <h1 className='text-sm'>{item.type_perangkat}</h1>
            </div>
            <h1 className='text-sm text-opacity-20'>{item.catatan_peminjaman}</h1>
          </div>
        ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onClick={() => handleCreateNew()} color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {peminjaman.length} tiket</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2 items-center'>
        {
          items.length > 0 ? (
            <>
              {
                items.map((item: any, index: number) => (
                  <div
                    key={index} 
                    onClick={() => openTicket(item, item.tiket)}
                    className={`
                      w-full min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 grid grid-cols-6 items-center transition-all ease-linear hover:bg-zinc-800 active:scale-95 cursor-pointer
                    `}
                  >
                    <Chip>{item.tiket}</Chip>
                    <div className='flex flex-col'>
                      <h1 className='font-bold text-md'>{item.nama_peminjam}</h1>
                      <h1 className='text-xs text-white/60'>{item.nik_peminjam}</h1>
                    </div>
                    <div className='flex flex-col'>
                      <h1>{item.tanggal_peminjaman}</h1>
                      <h1 className='text-xs text-white/60'>Peminjaman</h1>
                    </div>
                    {
                      item.kategori_peminjaman === 'peminjaman' ? (
                        <div className='flex flex-col'>
                          <h1>{item.tanggal_pengembalian}</h1>
                          <h1 className='text-xs text-white/60'>Pengembalian</h1>
                        </div>
                      ) : (
                        <div></div>
                      )
                    }
                    <div className='flex flex-row gap-2'>
                      <Chip className='capitalize'>{item.kategori_peminjaman}</Chip>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <Chip color={item.status_peminjaman === 'open' ? 'default' : item.status_peminjaman === 'close' ? 'success' : 'warning'} className='capitalize'>{item.status_peminjaman}</Chip>
                    </div>
                  </div>
                ))
              }
            </>
          ) : (
            <div
              className={`
                w-full min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 flex justify-center items-center
              `}
            >
              <h1 className='text-center text-md'>No ticket found!</h1>
            </div>
          )
        }
      </div>

      <div className="py-2 px-2 flex justify-center items-center gap-4">
        <Button isDisabled={pages === 1} variant="flat" onPress={onPreviousPage}>
          Previous
        </Button>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <Button isDisabled={pages === 1} variant="flat" onPress={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default ListTicket