import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
	    description: description,
	    sessionsCompleted: 0,
	    isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat([newItem]),
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    const ourItems = this.state.items;
    ourItems.filter(item => item.isCompleted == false);
    this.setState({
      items: ourItems
    });
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    const ourItems = this.state.items;
    for (let i = 0; i < ourItems.length; i++) {
      if (ourItems[i].id == itemId) {
        ourItems[i].sessionsCompleted += 1;
      }
    }
    this.setState((prevState => ({
      items: ourItems
    })));
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    const ourItems = this.state.items;
    for (let i = 0; i < ourItems.length; i++) {
      if (ourItems[i].id == itemId) {
        ourItems[i].isCompleted = !ourItems[i].isCompleted;
      }
    }
    this.setState((prevState => ({
      items: ourItems
    })));

    for (let i = 0; i < ourItems.length; i++) {
      if (ourItems[i].isCompleted) {
        this.setState({
          areItemsMarkedAsCompleted: true
        });
        break;
      } else if (i == ourItems.length - 1) {
        this.setState({
          areItemsMarkedAsCompleted: false
        });
      }
    }
  }

  startSession(id) {
    // TODO 4
    this.setState((prevState => ({
      sessionIsRunning: true,
      itemIdRunning: id
    })));
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    const a = (items.length == 0);
    return (
      {a ? (
        <EmptyState />
      ) : (
        <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
          />}
            <div className="items-container">
            {items.map((item) => (
              <TodoItem 
              description={item.description} 
              sessionsCompleted={item.sessionsCompleted} 
              isCompleted={items.isCompleted} 
              startSession={() => this.startSession(item.id)} 
              toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              key={item.id} />
            ))}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
        </div>
      )}
    );
  }
}

export default App;
