export const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(window.location.hash);

  return <Menu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
}
