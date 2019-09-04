import React, { Component } from 'react';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      nomeValido: 0,
      telefone: "",
      telefoneValido: 0,
      email: "",
      emailValido: 0,
      cep: "",
      cepValido: 0,
      data: "",
      dataValido: 0,
      cartaoCredito: "",
      cartaoCreditoValido: 0,
      formValido: false
    }

    this.changeHandle = this.changeHandle.bind(this);
    this.classeValidacao = this.classeValidacao.bind(this);
    this.formValido = this.formValido.bind(this);
    this.validacaoCampos= this.validacaoCampos.bind(this);
  }

  changeHandle(event) {
    const nome = event.target.name;
    const valor = event.target.value;

    this.setState({
      [nome]: valor
    }, () => {
      this.validacaoCampos(nome, valor);
    })
  }

  classeValidacao(valor) {
    if (valor === 0) {
      return "form-control";
    }

    if (valor === false) {
      return "form-control is-invalid";
    }

    if (valor === true) {
      return "form-control is-valid";
    }
  }

  formValido() {
    return this.setState({
      formValido: !!this.state.nomeValido && !!this.state.telefoneValido 
                  && !!this.state.emailValido && !!this.state.cepValido
                  && !!this.state.dataValido && !!this.state.cartaoCreditoValido
    }) 
  }

  validacaoCampos(nome, valor) {
    let regex, retorno;

    switch (nome) {
      case "nome":
        regex = /^(\d|[a-zA-ZÀ-ú]){4,28}$/g;
        retorno = regex.test(valor);
        break;

      case "telefone":
        regex = /^\(\d{3}\)\d{3}-\d{4}$/g;
        retorno = regex.test(valor);
        break;

      case "email":
        regex = /\S+@\S+\.\S+$/g;
        retorno = regex.test(valor);
        break;

      case "cep":
        regex = /(^\d{5}$|^\d{5}-\d{4}$)/g;
        retorno = regex.test(valor);
        break;

      case "data":
        regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g;
        retorno = regex.test(valor);
        break;

      case "cartaoCredito":
        regex = /(^\d{16}$|^\d{4}-\d{4}-\d{4}-\d{4}$)/g;
        retorno = regex.test(valor);
        break;

      default:
        break;
    }

    let nomeValido = nome + "Valido";

    this.setState({
      [nomeValido]: retorno
    }, this.formValido)
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Trab do Trab</a>
        </nav>
        <div className="container">
          <div className="row">
            <div className="mx-auto col-4" style={{marginTop: "10px"}}>
              <form>
                <div className="form-group">
                  <label>Nome</label>
                  <input className={`${this.classeValidacao(this.state.nomeValido)}`} name="nome" value={this.state.nome} onChange={this.changeHandle} />
                </div>  
                <div className="form-group">
                  <label>Telefone</label>
                  <input className={`${this.classeValidacao(this.state.telefoneValido)}`} name="telefone" value={this.state.telefone} onChange={this.changeHandle} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className={`${this.classeValidacao(this.state.emailValido)}`} name="email" value={this.state.email} onChange={this.changeHandle} />
                </div>
                <div className="form-group">
                  <label>CEP</label>
                  <input className={`${this.classeValidacao(this.state.cepValido)}`} name="cep" value={this.state.cep} onChange={this.changeHandle} />
                </div>
                <div className="form-group">
                  <label>Data</label>
                  <input className={`${this.classeValidacao(this.state.dataValido)}`} name="data" value={this.state.data} onChange={this.changeHandle} />
                </div>
                <div className="form-group">
                  <label>Cartão de Crédito</label>
                  <input className={`${this.classeValidacao(this.state.cartaoCreditoValido)}`} name="cartaoCredito" value={this.state.cartaoCredito} onChange={this.changeHandle} />
                </div>
                {
                  this.state.formValido ?
                  (<button type="submit" className="btn btn-dark">Enviar</button>)
                  :
                  (<button type="submit" className="btn btn-secondary disabled">Enviar</button>)
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
