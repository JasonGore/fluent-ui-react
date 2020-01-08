import * as React from 'react'
import EmployeeCard from './EmployeeCard'
import { Dropdown, DropdownProps } from '@fluentui/react'
// import { cardStyle } from 'docs/src/components/ComponentDoc/ComponentProps/ComponentPropCard'

class EmployeeCardPrototype extends React.Component<any> {
  state = {
    parentRole: null,
    cardRole: 'group',
    ariaRoleDescription: null,
    ariaExpanded: null,
  }

  getCards(numberOfCards, employee) {
    const cards = []
    for (let i = 0; i < numberOfCards; i++) {
      const cardOrder = { cardOrder: i }
      cards.push(
        <EmployeeCard
          {...employee}
          {...cardOrder}
          aria-labelledby={`user-name-${i} user-card-${i}`}
          id={`user-card-${i}`}
          aria-label=",card"
          tabIndex={0}
          role={this.state.cardRole}
          aria-roledescription={this.state.ariaRoleDescription}
          // aria-label={`${employee.firstName} user card`}
          aria-expanded={this.state.ariaExpanded}
        />,
      )
    }
    return cards
  }

  handleSelectedChange = (e: React.SyntheticEvent, { value }: DropdownProps) => {
    switch (value) {
      case 'card as group':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaExpanded: null })
        this.setState({ ariaRoleDescription: null })
        return
      case 'card as group with aria-expanded':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaExpanded: 'false' })
        this.setState({ ariaRoleDescription: null })
        return
      case 'card as group with aria-roledescription as card':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaRoleDescription: 'card' })
        this.setState({ ariaExpanded: null })
        return
      case 'menu and menuitem with aria-roledescription as card':
        this.setState({ cardRole: 'menuitem' })
        this.setState({ parentRole: 'menu' })
        this.setState({ ariaRoleDescription: 'card' })
        this.setState({ ariaExpanded: null })
        return
    }
  }

  render() {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      position: 'SR. SOFTWARE ENGINEER',
      location: 'Prague, Czech Republic',
      status: 'Avaiable',
      team: 'Fluent UI Engineering',
      email: 'John.Doe@company.com',
      avatar: {
        label: { variables: { backgroundColor: '#00b5ad', color: 'white' } },
        status: { color: 'green', icon: 'check', title: 'Available' },
      },
    }
    return (
      <div>
        <Dropdown
          inline
          items={[
            'card as group',
            'card as group with aria-expanded',
            'card as group with aria-roledescription as card',
            'menu and menuitem with aria-roledescription as card',
          ]}
          defaultValue={'Select aria roles to be used'}
          onSelectedChange={this.handleSelectedChange}
        />
        <div
          role={this.state.parentRole}
          // aria-label="Use arrows to navigate between cards."
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          {this.getCards(15, employee)}
        </div>
      </div>
    )
  }
}

export default EmployeeCardPrototype
