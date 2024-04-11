import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const HelmetHeader = ({ title }) => {
  return (
    <>
      <Helmet>
        <title title>{title}</title>
        <meta name='title' content={title} />
      </Helmet>
    </>
  );
};

HelmetHeader.propTypes = {
  title: PropTypes.string,
};

export default HelmetHeader;
