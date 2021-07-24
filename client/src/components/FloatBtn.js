import { Button, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
];

const DropdownExampleFloating = () => (
  <Button.Group color="teal">
    <Button>Save</Button>
    <Dropdown
      className="button icon"
      floating
      options={options}
      trigger={<></>}
    />
  </Button.Group>
);

export default DropdownExampleFloating;
