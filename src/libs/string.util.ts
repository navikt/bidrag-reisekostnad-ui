export function isEmpty(value?: string | null){
  return !value || value.trim().length == 0
}