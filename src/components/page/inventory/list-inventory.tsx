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
} from 'lucide-react'

import {
  perangkatOptions,
  kategoriOptions,
} from '@/types/example-ticket-data'

import { CalendarDate } from "@internationalized/date";

import {
  capitalize
} from '@/utils/utils'

type Props = {}

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

function ListInventory({}: Props) {
  const [inventoryItems, setInventoryItems] = useState<ListInventoryProps[]>([]);

  useEffect(() => {
    axios.get('/api/inventory')
      .then(res => {
        setInventoryItems(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const [filterValue, setFilterValue] = useState<any>("");
  const [kategoriFilter, setKategoriFilter] = useState<any>("all");
  const [statusFilter, setStatusFilter] = useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = useState<any>(5);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...inventoryItems];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.sn_perangkat.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== perangkatOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status_perangkat),
      );
    }
    if (kategoriFilter !== "all" && Array.from(kategoriFilter).length !== kategoriOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(kategoriFilter).includes(user.kategori_perangkat),
      );
    }

    return filteredUsers;
  }, [inventoryItems, filterValue, kategoriFilter, statusFilter]);

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

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by serial number..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
          <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Kategori
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={kategoriFilter}
                selectionMode="multiple"
                onSelectionChange={setKategoriFilter}
              >
                {kategoriOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
                {perangkatOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {inventoryItems.length} perangkat</span>
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
                    className={`
                      w-full min-h-[80px] bg-zinc-900 rounded-3xl shadow-md px-6 grid grid-cols-6 items-center transition-all ease-linear hover:bg-zinc-800 active:scale-95 cursor-pointer
                    `}
                  >
                    <Chip>{item.sn_perangkat}</Chip>
                    <div className='flex flex-col'>
                      <h1 className='font-bold text-md'>{item.csm_perangkat}</h1>
                      <h1 className='text-xs text-white/60'>{item.kategori_perangkat}</h1>
                    </div>
                    <div className='flex flex-col'>
                      <h1>{item.type_perangkat}</h1>
                      <h1 className='text-xs text-white/60'>Type</h1>
                    </div>
                    <div className='flex flex-col'>
                      <h1>{item.merek_perangkat}</h1>
                      <h1 className='text-xs text-white/60'>Merek</h1>
                    </div>
                    <div className='flex flex-col'>
                      <h1>{item.use_perangkat}</h1>
                      <h1 className='text-xs text-white/60'>Use</h1>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <Chip color={item.status_perangkat === 'available' ? 'success' : 'secondary'} className='capitalize'>{item.status_perangkat}</Chip>
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

export default ListInventory