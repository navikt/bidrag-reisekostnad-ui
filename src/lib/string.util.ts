export function isEmpty(value?: string | null){
  return !value || value.trim().length == 0
}

export function capitalizeFirstLetter(value?: string){
  if (!value) return ""
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}