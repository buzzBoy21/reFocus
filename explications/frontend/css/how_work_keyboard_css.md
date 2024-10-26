# Structure of a keyboard

> [Note]: if you don't know what is a a component don't mater, you can Imagine it is a div that have inside other html elements

- keyboard component -> Main component that wrap whole keyboard system (JS and CSS)

  - div -> .keyboard-container -> this div create the margin and place correctly on height

    - div -> .basis-keyboard-layout -> This div is the keyboard itself, It have the css to fit to the parent div.

      - Key Component:
        or

      -EmptySpace

const Button = styled.button({
padding: '10px 20px',
border: 'none',
borderRadius: '4px',
backgroundColor: '#1890ff',
color: '#fff',
fontSize: '14px',
cursor: 'pointer',
transition: '.3s background',
'&:hover': {
background: '#40a9ff',
},
boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
WebkitBoxShadow: '0px 4px 6px rgba(0, 0, 0, 0.9)',
});
