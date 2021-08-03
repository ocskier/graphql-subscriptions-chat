import { Icon } from 'semantic-ui-react';

const styles = {
  icon: {
    margin: 0,
    fontSize: '1em',
    alignSelf: 'flex-end',
  },
};

export const AddCommentBtn = ({ setCommenting }) => (
  <Icon
    name={'add circle'}
    circular
    size="small"
    style={styles.icon}
    onClick={() => setCommenting((oldVal) => setCommenting(!oldVal))}
  ></Icon>
);

export const SeeCommentsBtn = ({ setCommenting, setSeeComments }) => (
  <Icon
    name={'chevron circle down'}
    circular
    size="small"
    style={styles.icon}
    onClick={() =>
      setSeeComments((oldVal) => {
        if (oldVal) setCommenting(false);
        setSeeComments(!oldVal);
      })
    }
  ></Icon>
);
