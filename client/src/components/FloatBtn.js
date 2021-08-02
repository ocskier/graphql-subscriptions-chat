import { Icon } from 'semantic-ui-react';

const styles = {
  icon: {
    margin: 0,
    fontSize: '1em',
    alignSelf: 'flex-end',
  },
};

export const CommentFloatBtn = ({ name, setCommenting, setSeeComments }) => (
  <Icon
    name={name}
    circular
    size="small"
    style={styles.icon}
    onClick={() =>
      setCommenting
        ? setCommenting((oldVal) => setCommenting(!oldVal))
        : setSeeComments((oldVal) => setSeeComments(!oldVal))
    }
  ></Icon>
);
