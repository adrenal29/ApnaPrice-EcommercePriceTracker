'use client';
 
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
   
    const handleSearch = useDebouncedCallback((term:any) => {
        console.log(`Searching... ${term}`);
       
        const params = new URLSearchParams();
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
      }, 300);
  return (
    <>
    <input
  className="peer block w-2/3 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500"
  placeholder="Search items trending now"
  onChange={(e) => {
    handleSearch(e.target.value);
  }}
  defaultValue={searchParams?.get('query')?.toString()}
/>
    </>
  )
}