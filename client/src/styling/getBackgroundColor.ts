export const darkModeBgColor = '#121212';

export const lightModeBgColor = '#eaeaea';

export const getTransition = (enableTransition: boolean) => ({
  transition: enableTransition
    ? 'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
    : "none"
});

export const getModeBgColor = (
  darkMode: boolean
) => ({
  backgroundColor: darkMode 
    ? darkModeBgColor
    : lightModeBgColor
})

export const getBackgroundColor = (
  darkMode: boolean,
  enableTransition: boolean = true,
) => {
  return ({
    ...(getModeBgColor(darkMode)),
    ...(getTransition(enableTransition))
  })
}