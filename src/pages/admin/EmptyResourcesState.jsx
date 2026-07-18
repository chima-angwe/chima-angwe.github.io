import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import Button from '../../components/common/button/Button';

const EmptyResourcesState = ({ onCreate }) => {
  return (
    <div className="empty-state">
      <FaFilePdf size={32} />
      <h3>No resources yet</h3>
      <p>Add your first guide — the LinkedIn one is a good place to start.</p>
      <Button variant="primary" onClick={onCreate}>
        Add a Resource
      </Button>
    </div>
  );
};

export default EmptyResourcesState;