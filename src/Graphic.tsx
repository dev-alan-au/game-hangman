interface GraphicProps {
  numberOfIncorrectGuesses: number;
}

const justifyCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
}

const isVisible = (shouldShow: boolean) => ({
  opacity: shouldShow ? '1' : '0',
})

export default function Graphic({ numberOfIncorrectGuesses }: GraphicProps) {
  return (
    <div style={{ fontFamily: 'monospace', marginBottom: '3rem', ...justifyCenterStyle }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', ...isVisible(numberOfIncorrectGuesses > 2) }}>
          <div> |</div><div>---|</div>
        </div>
        <div>
          <div style={isVisible(numberOfIncorrectGuesses > 1)}> |</div>
        </div>
        <div>
          <div style={isVisible(numberOfIncorrectGuesses > 1)}> |</div>
        </div>
        <div>
          <div style={isVisible(numberOfIncorrectGuesses > 0)}> |___</div>
        </div>
      </div>
      <div>
        <div style={justifyCenterStyle}><div style={isVisible(numberOfIncorrectGuesses > 3)}> O </div></div>
        <div style={justifyCenterStyle}>
          <div style={isVisible(numberOfIncorrectGuesses > 5)}>/</div><div style={isVisible(numberOfIncorrectGuesses > 4)}>|</div><div style={isVisible(numberOfIncorrectGuesses > 6)}>\</div>
        </div>
        <div style={justifyCenterStyle}>
          <div style={isVisible(numberOfIncorrectGuesses > 7)}>/</div><div></div><div style={isVisible(numberOfIncorrectGuesses > 8)}>\</div>
        </div>
      </div>
    </div >
  )
}