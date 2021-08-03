import { Icon } from 'semantic-ui-react';

const styles = {
  icon: {
    margin: 0,
    fontSize: '1em',
    alignSelf: 'flex-end',
  },
};

export const CommentFloatBtn = ({
  name,
  seeComments,
  setCommenting,
  setSeeComments,
}) => (
  <Icon
    name={name}
    circular
    size="small"
    style={styles.icon}
    onClick={() =>
      setCommenting && seeComments
        ? setCommenting((oldVal) => setCommenting(!oldVal))
        : setSeeComments((oldVal) => {
            if (oldVal) setCommenting(false);
            setSeeComments(!oldVal);
          })
    }
  ></Icon>
);
