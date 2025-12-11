import type { MenuItem } from "../types"

type MenuItemProps = {
  item: MenuItem
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <button className="border-2 border-teal-400 w-full p-3 flex justify-between hover:bg-teal-200 rounded">
      <p>{item.name}</p>
      <span className="font-black">${item.price}</span>
    </button>
  )
}
