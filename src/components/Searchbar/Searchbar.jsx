import React, { Component } from 'react';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            value={searchQuery}
            onChange={this.handleInputChange}
            placeholder="Search images and photos"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
