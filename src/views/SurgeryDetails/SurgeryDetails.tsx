import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import CircularProg from 'components/CircularProgress';
import { SURGERY } from 'graphql/queries';
import { State } from 'redux/state.interface';
import icon from 'assets/icons/eyeScalpel.svg';
import './SurgeryDetails.sass';

const SurgeryDetails: React.FC = () => {
  const selected_surgery = useSelector((state: State) => state['SelectedSurgery']);
  const [elements, setElements] = useState<any>([]);
  const { loading, data, refetch } = useQuery(SURGERY, {
    variables: { id: selected_surgery },
  });

  useEffect(() => {
    refetch();
    if (!loading) {
      const surgery = data['surgery'];
      const _data: any = {
        'Cirugía: ': surgery['name'],
        'Duración: ': `${surgery['duration']} ${surgery['duration'] === 1 ? 'hora' : 'horas'}`,
        'Anestesia: ': surgery['anesthesia'],
        'Precio: ': `$${surgery['price']}`,
        'Folio: ': surgery['serial'],
        'Paciente: ': surgery['patientName'],
        '¿Se necesita lente intraocular? ': surgery['needLens'] ? 'Si' : 'No',
        '¿Que dioptria es el lente? ': surgery['dioptria'],
        '¿Es flexible o PMMA? ': surgery['flexibleOrPMMA'],
        '¿Se necesita silicon? ': surgery['needSilicon'] ? 'Si' : 'No',
        '¿Que otro insumo se necesita? ': surgery['otherThing'],
        'Estatus:': surgery['status'],
      };
      setElements(
        Object.keys(_data).map((key: string) => {
          return (
            <div className="surgery-details__details__row" key={key}>
              <p className="surgery-details__details__row__key">{key}</p>
              <p className="surgery-details__details__row__val">{_data[key]}</p>
            </div>
          );
        }),
      );
    }
  }, [refetch, data, loading]);

  const CircularProgress = () => {
    return loading ? (
      <div className="loading">
        <CircularProg />
      </div>
    ) : (
      <></>
    );
  };

  return (
    <div className="surgery-details">
      <img src={icon} alt="icon" />
      <div className="surgery-details__details">{elements}</div>
      <CircularProgress />
    </div>
  );
};

export default SurgeryDetails;
