import React from 'react'

function UserData({ onNext }) {
  const [data, setData] = React.useState({})

  function handleInput(event) {
    const field = event.target
    setData({ ...data, [field.name]: field.value })
  }

  async function handleNext() {
    onNext(data)
  }

  return (
    <form>
      <p>Cadastro</p>
      <p>
        <input
          name="name"
          type="text"
          placeholder="Nome"
          onInput={handleInput}
        />
      </p>
      <p>
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          onInput={handleInput}
        />
      </p>
      <p>
        <button type="button" onClick={handleNext}>
          Próximo
        </button>
      </p>
    </form>
  )
}

export default UserData
