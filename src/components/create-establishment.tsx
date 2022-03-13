import React, { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_ESTABLISHMENT, GET_ESTABLISHMENTS_OF_CUSTODIAN } from '../graphql';

import { zeroUuid } from './data';

export interface CreateEstablishmentProps {
}

const defaultParams = {
  custodianId: zeroUuid,
  categoryTopicId: zeroUuid,
  location: {
    lat: 0,
    lng: 0
  }
}

export function CreateEstablishment(props: CreateEstablishmentProps) {
  const [execMutation, { data, error, loading }] = useMutation(CREATE_ESTABLISHMENT, {
    refetchQueries: [
      GET_ESTABLISHMENTS_OF_CUSTODIAN
    ]
  });

  const [state, setState] = useState<Record<string, string>>({});
  const changeHandler = (field: string) => {
    return function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setState(prev => ({ ...prev, [field]: e.target.value }));
    }
  }

  const handleSubmit = () => {
    void execMutation({
      variables: {
        params: {
          ...state,
          profileName: state.name,
          ...defaultParams
        }
      }
    });
  };

  const canSubmit = !loading && state.name && state.shortDescription;

  return (
    <div>
      <input
        placeholder="Name"
        value={state.name}
        onChange={changeHandler('name')}
      />

      <input
        placeholder="Short Description"
        value={state.shortDescription}
        onChange={changeHandler('shortDescription')}
      />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
      >Submit</button>
    </div>
  );
}
