import tw from '@tw'

export const sheetTitle = tw`flex p-1 mt-2 leading-4 rounded-sm text-ronchi w-fit bg-bossanova-hl`

export const sheetRow = tw`flex flex-row mt-3 mb-0 ml-0 mr-4 border-t-0 border-b border-l-0 border-r-0 border-solid border-coolgray-600 min-h-4`

export const rowName = tw`p-1 text-sm leading-4 text-white rounded-tl rounded-tr pointer-events-none select-none self-baseline bg-coolgray-600`

export const rowValue = tw`flex-1 mt-1 text-sm text-right text-white self-baseline`

export const rowValueFlexless = tw`mt-1 text-sm text-right text-white self-baseline`

export const rowValueAdd = tw`ml-2 text-sm text-left text-greenyellow self-baseline`

export const rowValueWide = tw`flex-row border-t-0 border-b-0 border-l border-r-0 border-solid border-coolgray-600`

export const rowContents = tw`mr-4 text-white border border-solid rounded-bl rounded-br border-coolgray-600 border-t-none`
//   transition: height 0.25s ease // unsupported T.T

export const listItem = (selected, index) => tw`flex-row min-h-6 items-center pt-1 pb-1 pointer-events-none ${selected ? 'bg-ronchi bg-opacity-50' : !(index%2) ? 'bg-transparent' : 'bg-white bg-opacity-10'}`

export const listItemName = tw`ml-2 text-sm leading-4 text-white pointer-events-none`

export const listItemDesc = tw`flex-1 mr-2 text-sm leading-4 text-right text-white pointer-events-none`

export const listItemDealing = tw`flex-1 mr-2 text-sm leading-4 text-right pointer-events-none text-greenyellow self-baseline`
