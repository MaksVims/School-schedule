
export const installHeightCell = (table: HTMLTableElement | null, rowsCount: number) => {
  if (!table) return
  const rows = table.querySelectorAll('tr')

  if (table) {
    let height = table.scrollHeight / rowsCount
    if (rows) {
      rows.forEach(row => {
        (row as HTMLTableRowElement).style.height = `${height}px`
      })
    }
  }
}