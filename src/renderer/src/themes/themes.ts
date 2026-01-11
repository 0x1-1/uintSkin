import { Theme } from './types'

// Helper to quickly build background/text/border blocks
const surfaces = (base: string, surface: string, elevated: string) => ({
  base,
  surface,
  elevated
})

const textSet = (primary: string, secondary: string, muted: string, inverse: string) => ({
  primary,
  secondary,
  muted,
  inverse
})

const borderSet = (def: string, strong: string, subtle: string) => ({
  default: def,
  strong,
  subtle
})

// 1) Brand (Mythic)
export const mythicLightTheme: Theme = {
  id: 'mythic-light',
  name: 'Mythic Light',
  description: 'Stüdyo ferahlığı, neon vurgu',
  isDark: false,
  colors: {
    primary: {
      50: '#e6f9ff',
      100: '#c0f1ff',
      200: '#8de4ff',
      300: '#52d4ff',
      400: '#1bc3ff',
      500: '#00b0f0',
      600: '#0097d1',
      700: '#0077a6',
      800: '#005c82',
      900: '#004766',
      950: '#022b3d'
    },
    secondary: {
      50: '#fff0fb',
      100: '#ffd5f4',
      200: '#ffade7',
      300: '#ff7ed6',
      400: '#ff55c5',
      500: '#f037ac',
      600: '#d11f8f',
      700: '#ac1774',
      800: '#84125b',
      900: '#5f0c42',
      950: '#3a072a'
    },
    background: surfaces('#f6f7fb', '#ffffff', '#e8edff'),
    text: textSet('#0b1024', '#1f2a44', '#4b5879', '#f6f7fb'),
    border: borderSet('#dfe4f5', '#c7d0eb', '#eef2ff'),
    state: { success: '#12c48b', warning: '#f2b34d', error: '#f97066', info: '#2bb0f5' }
  }
}

export const mythicDarkTheme: Theme = {
  id: 'mythic-dark',
  name: 'Mythic Dark',
  description: 'Obsidian taban, neon teal',
  isDark: true,
  colors: {
    primary: {
      50: '#e6f9ff',
      100: '#c0f1ff',
      200: '#8de4ff',
      300: '#52d4ff',
      400: '#1bc3ff',
      500: '#00b0f0',
      600: '#0097d1',
      700: '#0077a6',
      800: '#005c82',
      900: '#004766',
      950: '#022b3d'
    },
    secondary: {
      50: '#fff0fb',
      100: '#ffd5f4',
      200: '#ffade7',
      300: '#ff7ed6',
      400: '#ff55c5',
      500: '#f037ac',
      600: '#d11f8f',
      700: '#ac1774',
      800: '#84125b',
      900: '#5f0c42',
      950: '#3a072a'
    },
    background: surfaces('#050914', '#0c1426', '#121c30'),
    text: textSet('#e6edff', '#c1cffb', '#8ba1d5', '#050914'),
    border: borderSet('#1a2540', '#263454', '#0c1426'),
    state: { success: '#21d8a4', warning: '#f2c45d', error: '#ff6b6b', info: '#4ecbff' }
  }
}

// 2) Ocean
export const oceanLight: Theme = {
  id: 'ocean-light',
  name: 'Ocean Light',
  description: 'Serin mavi ve turkuaz',
  isDark: false,
  colors: {
    primary: {
      50: '#e8f6ff',
      100: '#c6e8ff',
      200: '#9ad7ff',
      300: '#66c3ff',
      400: '#32adff',
      500: '#0a94f0',
      600: '#0676c3',
      700: '#055fa1',
      800: '#064c80',
      900: '#073f69',
      950: '#052a46'
    },
    secondary: {
      50: '#e6fffb',
      100: '#b8fff2',
      200: '#7cf5e2',
      300: '#45e3d0',
      400: '#1cc2ae',
      500: '#0fa892',
      600: '#0a8775',
      700: '#0b6b5e',
      800: '#0e554c',
      900: '#0f453f',
      950: '#062b28'
    },
    background: surfaces('#f5fbff', '#ffffff', '#e9f3ff'),
    text: textSet('#0a1a2f', '#233754', '#50627d', '#f5fbff'),
    border: borderSet('#d7e5f4', '#b7c9dc', '#edf3fb'),
    state: { success: '#19b889', warning: '#f3b34c', error: '#e85d65', info: '#2498ff' }
  }
}

export const oceanDark: Theme = {
  id: 'ocean-dark',
  name: 'Ocean Dark',
  description: 'Derin lacivert ve aqua',
  isDark: true,
  colors: {
    primary: {
      50: '#d9f0ff',
      100: '#b5dfff',
      200: '#84c9ff',
      300: '#55b1ff',
      400: '#2c99f3',
      500: '#0f7fda',
      600: '#0a66b5',
      700: '#0a528f',
      800: '#0c4171',
      900: '#0e365c',
      950: '#082340'
    },
    secondary: {
      50: '#dffcf5',
      100: '#b5f5e6',
      200: '#80e8d3',
      300: '#4dd3be',
      400: '#25b7a1',
      500: '#179c86',
      600: '#0f7c6b',
      700: '#0f6255',
      800: '#104f46',
      900: '#0d413a',
      950: '#082b28'
    },
    background: surfaces('#061021', '#0a162c', '#0f1d38'),
    text: textSet('#dfe8ff', '#b9c8e9', '#8da0c4', '#061021'),
    border: borderSet('#16223b', '#20314d', '#0c1529'),
    state: { success: '#1ad1a3', warning: '#f0c15f', error: '#ef646e', info: '#4cb7ff' }
  }
}

// 3) Ember
export const emberLight: Theme = {
  id: 'ember-light',
  name: 'Ember Light',
  description: 'Sıcak turuncu ve kömür',
  isDark: false,
  colors: {
    primary: {
      50: '#fff4e6',
      100: '#ffe4bf',
      200: '#ffc88a',
      300: '#ffab52',
      400: '#ff9226',
      500: '#ff7a0f',
      600: '#e25f08',
      700: '#bb470a',
      800: '#94380f',
      900: '#77300f',
      950: '#411603'
    },
    secondary: {
      50: '#ffe9ef',
      100: '#ffc8d8',
      200: '#ff93b3',
      300: '#ff628d',
      400: '#fa366c',
      500: '#df1c55',
      600: '#be0f45',
      700: '#980a39',
      800: '#7c0d35',
      900: '#660c2f',
      950: '#40051e'
    },
    background: surfaces('#fff9f2', '#ffffff', '#fff0e0'),
    text: textSet('#1d0f07', '#3a2419', '#6a4a34', '#fff9f2'),
    border: borderSet('#f1dfcf', '#e4c8ad', '#fff2e6'),
    state: { success: '#1dbf85', warning: '#f3b54c', error: '#e64b5a', info: '#3c9cf1' }
  }
}

export const emberDark: Theme = {
  id: 'ember-dark',
  name: 'Ember Dark',
  description: 'Lav ışıltısı ve kömür tabanı',
  isDark: true,
  colors: {
    primary: {
      50: '#ffe9d4',
      100: '#ffd4aa',
      200: '#ffb573',
      300: '#ff9740',
      400: '#ff7f1d',
      500: '#ef6507',
      600: '#c44f05',
      700: '#9b3d09',
      800: '#79310c',
      900: '#622b0d',
      950: '#391604'
    },
    secondary: {
      50: '#ffe6ee',
      100: '#ffc8dc',
      200: '#ff95ba',
      300: '#ff6297',
      400: '#fa3a79',
      500: '#dc1f63',
      600: '#b51551',
      700: '#8d1243',
      800: '#6e1238',
      900: '#571430',
      950: '#33081d'
    },
    background: surfaces('#0d0a0a', '#141010', '#1c1513'),
    text: textSet('#f6e9de', '#e4cbb8', '#b3947b', '#0d0a0a'),
    border: borderSet('#2b201c', '#3a2b25', '#16100f'),
    state: { success: '#27d197', warning: '#f1c56a', error: '#f46b6b', info: '#4ca7ff' }
  }
}

// 4) Forest
export const forestLight: Theme = {
  id: 'forest-light',
  name: 'Forest Light',
  description: 'Tozlu yeşil ve toprak tonları',
  isDark: false,
  colors: {
    primary: {
      50: '#edf8ef',
      100: '#d5f0db',
      200: '#aee4b7',
      300: '#7bd788',
      400: '#4fcb63',
      500: '#2eb14b',
      600: '#1f8f3b',
      700: '#1b7334',
      800: '#195c2d',
      900: '#164c27',
      950: '#0b2b16'
    },
    secondary: {
      50: '#f3efe6',
      100: '#e6decd',
      200: '#cfbf9c',
      300: '#b19a6b',
      400: '#9a7a44',
      500: '#846330',
      600: '#6c4e25',
      700: '#57401f',
      800: '#45321a',
      900: '#392917',
      950: '#21160c'
    },
    background: surfaces('#f8fbf8', '#ffffff', '#eaf4ec'),
    text: textSet('#0e1a11', '#233627', '#4a5a4c', '#f8fbf8'),
    border: borderSet('#dbe5dc', '#c3d1c5', '#eef4ee'),
    state: { success: '#2bbf7a', warning: '#d9a545', error: '#e36363', info: '#3b99e3' }
  }
}

export const forestDark: Theme = {
  id: 'forest-dark',
  name: 'Forest Dark',
  description: 'Derin çam ve yosun',
  isDark: true,
  colors: {
    primary: {
      50: '#ddf4e3',
      100: '#b1e6c4',
      200: '#7cd89c',
      300: '#48c874',
      400: '#28b05a',
      500: '#1f964a',
      600: '#1c7a3e',
      700: '#1b6136',
      800: '#174d2e',
      900: '#123e27',
      950: '#0b2518'
    },
    secondary: {
      50: '#ede6db',
      100: '#d9ccb6',
      200: '#c1aa87',
      300: '#a2805a',
      400: '#8c6439',
      500: '#754f29',
      600: '#5f3e21',
      700: '#4b311c',
      800: '#3a2617',
      900: '#2f1f13',
      950: '#1b1009'
    },
    background: surfaces('#0b120e', '#111a15', '#16241d'),
    text: textSet('#e3f0e6', '#c4d8c8', '#95aa99', '#0b120e'),
    border: borderSet('#1a241d', '#243029', '#111a15'),
    state: { success: '#2bca85', warning: '#d9b257', error: '#e56b6b', info: '#4ca3e8' }
  }
}

// 5) Dusk
export const duskLight: Theme = {
  id: 'dusk-light',
  name: 'Dusk Light',
  description: 'Leylak ve günbatımı',
  isDark: false,
  colors: {
    primary: {
      50: '#f6f3ff',
      100: '#e7deff',
      200: '#cbb8ff',
      300: '#ac8fff',
      400: '#926dff',
      500: '#7b52f2',
      600: '#6840d3',
      700: '#5533ad',
      800: '#452c8a',
      900: '#3b286e',
      950: '#23184b'
    },
    secondary: {
      50: '#fff1e8',
      100: '#ffd9c0',
      200: '#ffb182',
      300: '#ff904f',
      400: '#ff7a2b',
      500: '#f56313',
      600: '#d24c0b',
      700: '#a93b0f',
      800: '#873011',
      900: '#6f2a11',
      950: '#3f1406'
    },
    background: surfaces('#fbf9ff', '#ffffff', '#f2ebff'),
    text: textSet('#151129', '#2f2647', '#5c5076', '#fbf9ff'),
    border: borderSet('#e3dffc', '#c9c0ee', '#f1ecff'),
    state: { success: '#25c595', warning: '#f2b649', error: '#ec5f6b', info: '#3fa9f5' }
  }
}

export const duskDark: Theme = {
  id: 'dusk-dark',
  name: 'Dusk Dark',
  description: 'Mor gece ve amber dokunuşu',
  isDark: true,
  colors: {
    primary: {
      50: '#efe8ff',
      100: '#d7c6ff',
      200: '#b499ff',
      300: '#916bff',
      400: '#7245f4',
      500: '#5d2de1',
      600: '#4b23bf',
      700: '#3c1c98',
      800: '#30187a',
      900: '#281663',
      950: '#180d43'
    },
    secondary: {
      50: '#ffe7d5',
      100: '#ffc49c',
      200: '#ff9a5d',
      300: '#ff7b2c',
      400: '#f85f0a',
      500: '#db4b02',
      600: '#b43c04',
      700: '#8d310a',
      800: '#6f290d',
      900: '#59230e',
      950: '#351205'
    },
    background: surfaces('#0c0a14', '#121020', '#19172c'),
    text: textSet('#eae5ff', '#c8bdf1', '#998ec5', '#0c0a14'),
    border: borderSet('#211d33', '#2e2845', '#141224'),
    state: { success: '#2ad9a6', warning: '#f1c065', error: '#f26c6c', info: '#5cb3ff' }
  }
}

// 6) Aurora
export const auroraLight: Theme = {
  id: 'aurora-light',
  name: 'Aurora Light',
  description: 'Soğuk nane ve mor',
  isDark: false,
  colors: {
    primary: {
      50: '#e9fbf7',
      100: '#c7f6e8',
      200: '#92edd3',
      300: '#5ae2bd',
      400: '#2dd3a6',
      500: '#13b88b',
      600: '#0e9873',
      700: '#0e7b5f',
      800: '#0f634e',
      900: '#0e5141',
      950: '#052f26'
    },
    secondary: {
      50: '#f4e9ff',
      100: '#e8d4ff',
      200: '#d2b0ff',
      300: '#b47eff',
      400: '#9a53f6',
      500: '#8635de',
      600: '#7229bc',
      700: '#5c2297',
      800: '#4a1d79',
      900: '#3d1a62',
      950: '#250f42'
    },
    background: surfaces('#f7fcfb', '#ffffff', '#ecf6f3'),
    text: textSet('#0d1914', '#22322c', '#4b5b53', '#f7fcfb'),
    border: borderSet('#d7e6e0', '#c0d4cc', '#eaf2ee'),
    state: { success: '#25c598', warning: '#f1b855', error: '#e9616c', info: '#469ef2' }
  }
}

export const auroraDark: Theme = {
  id: 'aurora-dark',
  name: 'Aurora Dark',
  description: 'Kutup ışığı kontrastı',
  isDark: true,
  colors: {
    primary: {
      50: '#d8f4eb',
      100: '#b1e8d7',
      200: '#7ad9bf',
      300: '#40c9a6',
      400: '#1fb28f',
      500: '#159876',
      600: '#118064',
      700: '#116752',
      800: '#105241',
      900: '#0d4337',
      950: '#07271f'
    },
    secondary: {
      50: '#efe5ff',
      100: '#d7c4ff',
      200: '#b796ff',
      300: '#9665ff',
      400: '#7f3ff5',
      500: '#6c28dc',
      600: '#5a20b8',
      700: '#4a1b96',
      800: '#3c1877',
      900: '#301660',
      950: '#1c0d3d'
    },
    background: surfaces('#0a1012', '#0f161a', '#151e23'),
    text: textSet('#e1f0e9', '#bcd4c7', '#8da9a0', '#0a1012'),
    border: borderSet('#1b2628', '#243034', '#0f161a'),
    state: { success: '#2bcd9d', warning: '#e9be63', error: '#ed6d76', info: '#62b6ff' }
  }
}

// 7) Sandstone
export const sandLight: Theme = {
  id: 'sand-light',
  name: 'Sandstone Light',
  description: 'Krem ve killi turuncu',
  isDark: false,
  colors: {
    primary: {
      50: '#fff8ec',
      100: '#fdecc8',
      200: '#f8d998',
      300: '#f0c268',
      400: '#e2a93d',
      500: '#c99025',
      600: '#a4721a',
      700: '#845815',
      800: '#6a4615',
      900: '#573912',
      950: '#311e08'
    },
    secondary: {
      50: '#e8f5ff',
      100: '#cbe8ff',
      200: '#9fd2ff',
      300: '#6cb8ff',
      400: '#409df8',
      500: '#2484df',
      600: '#1a69b5',
      700: '#175591',
      800: '#184874',
      900: '#173d61',
      950: '#0d243d'
    },
    background: surfaces('#fffcf6', '#ffffff', '#f5eede'),
    text: textSet('#1f1407', '#3c2a19', '#6a5235', '#fffcf6'),
    border: borderSet('#eadcc8', '#d1c2a7', '#f6eddd'),
    state: { success: '#2fbf83', warning: '#f0b34d', error: '#dd5a5f', info: '#368ee4' }
  }
}

export const sandDark: Theme = {
  id: 'sand-dark',
  name: 'Sandstone Dark',
  description: 'Koyu kil ve mavi vurgu',
  isDark: true,
  colors: {
    primary: {
      50: '#f9eedc',
      100: '#f0d6af',
      200: '#e3b878',
      300: '#d69c4d',
      400: '#c8832a',
      500: '#a9691c',
      600: '#885217',
      700: '#6c4015',
      800: '#563314',
      900: '#452b13',
      950: '#251507'
    },
    secondary: {
      50: '#daedff',
      100: '#b5d8ff',
      200: '#82beff',
      300: '#4ba1ff',
      400: '#1c86f5',
      500: '#0e6ed8',
      600: '#0c56af',
      700: '#0e468c',
      800: '#123c73',
      900: '#123462',
      950: '#0b1f3f'
    },
    background: surfaces('#0f0c0a', '#15100d', '#1c1611'),
    text: textSet('#f5ebdf', '#e0ccad', '#b29b75', '#0f0c0a'),
    border: borderSet('#29211b', '#362b22', '#17120e'),
    state: { success: '#36c08c', warning: '#e7b964', error: '#df6b6d', info: '#5ca6f5' }
  }
}

// 8) Mint
export const mintLight: Theme = {
  id: 'mint-light',
  name: 'Mint Light',
  description: 'Nane ve gece mavisi vurgusu',
  isDark: false,
  colors: {
    primary: {
      50: '#e9fff4',
      100: '#c2ffe3',
      200: '#8bf8cc',
      300: '#55ecb4',
      400: '#2fdda1',
      500: '#18c38a',
      600: '#12a074',
      700: '#138161',
      800: '#166750',
      900: '#155342',
      950: '#0a3128'
    },
    secondary: {
      50: '#eaf2ff',
      100: '#cfdfff',
      200: '#a6c3ff',
      300: '#7aa4ff',
      400: '#5485ff',
      500: '#3a6af0',
      600: '#2e52cd',
      700: '#2740a6',
      800: '#243884',
      900: '#21326b',
      950: '#131c40'
    },
    background: surfaces('#f5fffb', '#ffffff', '#e7f7f1'),
    text: textSet('#0e1a14', '#21332a', '#4a5a52', '#f5fffb'),
    border: borderSet('#d5e7dd', '#c0d6cd', '#e9f3ed'),
    state: { success: '#28c999', warning: '#f2bc55', error: '#e56674', info: '#4b9df0' }
  }
}

export const mintDark: Theme = {
  id: 'mint-dark',
  name: 'Mint Dark',
  description: 'Soğuk mint ve gece mavisi',
  isDark: true,
  colors: {
    primary: {
      50: '#d9f7ea',
      100: '#adedd4',
      200: '#73dfb9',
      300: '#3dcf9f',
      400: '#1eb787',
      500: '#149c73',
      600: '#138264',
      700: '#136955',
      800: '#115245',
      900: '#0e443a',
      950: '#08281f'
    },
    secondary: {
      50: '#e4ebff',
      100: '#c4d2ff',
      200: '#97b1ff',
      300: '#6a8cff',
      400: '#486bf7',
      500: '#3453de',
      600: '#2c43b7',
      700: '#263692',
      800: '#223076',
      900: '#1d295f',
      950: '#121a3d'
    },
    background: surfaces('#0b1013', '#0f1418', '#151c22'),
    text: textSet('#dfede7', '#bacfca', '#8aa6a1', '#0b1013'),
    border: borderSet('#192328', '#202c32', '#0f1418'),
    state: { success: '#2bd3a3', warning: '#e8c06a', error: '#e66e7c', info: '#6babff' }
  }
}

// 9) Slate
export const slateLight: Theme = {
  id: 'slate-light',
  name: 'Slate Light',
  description: 'Monokrom esintiler',
  isDark: false,
  colors: {
    primary: {
      50: '#f4f7fb',
      100: '#e5eaf3',
      200: '#cfd7e5',
      300: '#b3bed3',
      400: '#8f9ebb',
      500: '#6f83a3',
      600: '#576a8a',
      700: '#485775',
      800: '#3e4961',
      900: '#373f53',
      950: '#222735'
    },
    secondary: {
      50: '#eef6ff',
      100: '#d7e7fb',
      200: '#b5cff3',
      300: '#8fb5e6',
      400: '#7098d8',
      500: '#5b7fc3',
      600: '#4c68a7',
      700: '#41558b',
      800: '#39496f',
      900: '#323f5c',
      950: '#1f2638'
    },
    background: surfaces('#f7f9fd', '#ffffff', '#edf1f8'),
    text: textSet('#0f1725', '#25304a', '#4a5670', '#f7f9fd'),
    border: borderSet('#dbe0ec', '#c2c9db', '#eef1f8'),
    state: { success: '#2bbf94', warning: '#e6b758', error: '#df6b76', info: '#4c97e6' }
  }
}

export const slateDark: Theme = {
  id: 'slate-dark',
  name: 'Slate Dark',
  description: 'Koyu çelik ve buz',
  isDark: true,
  colors: {
    primary: {
      50: '#e8edf6',
      100: '#cdd8eb',
      200: '#a9b8d8',
      300: '#8396c3',
      400: '#657aac',
      500: '#4f6293',
      600: '#414f75',
      700: '#36405f',
      800: '#2f354e',
      900: '#282d42',
      950: '#161a29'
    },
    secondary: {
      50: '#e4efff',
      100: '#c9dcf7',
      200: '#9ebde9',
      300: '#719bd6',
      400: '#4f7fc3',
      500: '#3b69ad',
      600: '#30548f',
      700: '#2a4475',
      800: '#253a61',
      900: '#202f50',
      950: '#131c32'
    },
    background: surfaces('#0d1118', '#121824', '#171f2d'),
    text: textSet('#dfe7f2', '#bcc8dc', '#8ea0b9', '#0d1118'),
    border: borderSet('#1c2431', '#252f40', '#121824'),
    state: { success: '#30c39f', warning: '#e3bc69', error: '#e06c76', info: '#6aa9f5' }
  }
}

export const defaultLightTheme = mythicLightTheme
export const defaultDarkTheme = mythicDarkTheme

export const themes: Theme[] = [
  mythicLightTheme,
  mythicDarkTheme,
  oceanLight,
  oceanDark,
  emberLight,
  emberDark,
  forestLight,
  forestDark,
  duskLight,
  duskDark,
  auroraLight,
  auroraDark,
  sandLight,
  sandDark,
  mintLight,
  mintDark,
  slateLight,
  slateDark
]

export const lightThemes = themes.filter((t) => !t.isDark)
export const darkThemes = themes.filter((t) => t.isDark)

export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}

export function getThemeForMode(themeId: string, isDark: boolean): Theme | undefined {
  const baseThemeName = themeId.replace(/-light|-dark/, '')
  const suffix = isDark ? '-dark' : '-light'
  return getThemeById(`${baseThemeName}${suffix}`)
}
