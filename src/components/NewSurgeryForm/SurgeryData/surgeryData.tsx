import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { ColorButton } from './surgeryData.style';
import RadioGroup from 'components/NewSurgeryForm/RadioGroup';
import { NumberFormatCustom } from 'components/NewSurgeryForm/NumberFormat';
import Select from 'components/NewSurgeryForm/Select';
import SimpleModal from 'components/Modal';

import { ADD_SURGERY } from 'graphql/mutations';

import { State } from 'redux/state.interface';

import { DataOfNewSurgery } from './surgeryData.interfaces';
import { RadioGroupInterface } from 'global-interfaces';

import './surgeryData.sass';

const SurgeryData = () => {
  const [addSurgery, { data }] = useMutation(ADD_SURGERY);
  const router = useHistory();

  const selectedDay = useSelector((state: State) => state['SelectedDay']);
  const doctors = useSelector((state: State) => state['Doctors']);
  const surgeries = useSelector((state: State) => state['Surgeries']);

  const [render, setRender] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [surgeryData, setSurgeryData] = useState<DataOfNewSurgery>({
    patientName: '',
    name: '',
    date: selectedDay['selected_day'],
    anesthesia: 'Local',
    price: '',
    profesionalID: '',
    needLens: false,
    dioptria: '',
    flexibleOrPMMA: 'PMMA',
    needSilicon: false,
    otherThing: 'Ninguno',
  });

  useEffect(() => {
    if (!!data) if (data['newSurgeryByAdmin'] === 'Surgery added') setOpen(true);
    if (
      surgeryData.patientName.length > 0 &&
      surgeryData.name.length > 0 &&
      surgeryData.price.length > 0 &&
      surgeryData.dioptria.length > 0 &&
      surgeryData.profesionalID.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data, router, surgeryData]);

  const changeState: Function = (name: string, value: string) => {
    setSurgeryData({
      ...surgeryData,
      [name]: value,
    });
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSurgeryData({
      ...surgeryData,
      [ev.target.name]: ev.target.value,
    });
  };

  const onClick: Function = () => {
    addSurgery({
      variables: {
        ...surgeryData,
      },
    });
  };

  const radioGroupContent: Array<RadioGroupInterface> = [
    {
      question: 'Anestesia',
      firstVal: 'general_anesthesia',
      firstLabel: 'General',
      secondVal: 'local_anesthesia',
      secondLabel: 'Local',
      onClick: (val: string) => {
        setSurgeryData({ ...surgeryData, anesthesia: val });
      },
    },
    {
      question: '¿Necesitas lente intraocular?',
      firstVal: 'intraocular_yes',
      firstLabel: 'Si',
      secondVal: 'intraocular_no',
      secondLabel: 'No',
      onClick: (val: boolean) => {
        setSurgeryData({ ...surgeryData, needLens: val });
      },
    },
    {
      question: '¿Es flexible o PMMA?',
      firstVal: 'flexible',
      firstLabel: 'Flexible',
      secondVal: 'pmma',
      secondLabel: 'PMMA',
      onClick: (val: string) => {
        setSurgeryData({ ...surgeryData, flexibleOrPMMA: val });
      },
    },
    {
      question: '¿Necesitas silicon?',
      firstVal: 'silicon_yes',
      firstLabel: 'Si',
      secondVal: 'silicon_no',
      secondLabel: 'No',
      onClick: (val: boolean) => {
        setSurgeryData({ ...surgeryData, needSilicon: val });
      },
    },
    {
      question: '¿Necesitas otro insumo?',
      firstVal: 'inputs_yes',
      firstLabel: 'Si',
      secondVal: 'inputs_no',
      secondLabel: 'No',
      onClick: (val: boolean) => {
        console.log('90');

        setRender(val);
      },
    },
  ];

  const DoctorSelect: React.FC = () => (
    <div className="question">
      <p>Doctor</p>
      <Select
        data={doctors}
        value={surgeryData['profesionalID']}
        name="profesionalID"
        changeState={(name: string, value: string) => changeState(name, value)}
      />
    </div>
  );

  const SurgerySelect: React.FC = () => (
    <div className="question">
      <p>Cirugía</p>
      <Select
        data={surgeries}
        value={surgeryData['name']}
        name="name"
        changeState={(name: string, value: string) => changeState(name, value)}
      />
    </div>
  );

  const patientInput: JSX.Element = (
    <div className="question">
      <p>Nombre del paciente</p>
      <TextField
        id="patientName"
        label="Nombre"
        variant="outlined"
        name="patientName"
        onChange={onChange}
      />
    </div>
  );

  const priceInput: JSX.Element = (
    <div className="question">
      <p>Precio</p>
      <TextField
        id="price"
        label="Precio"
        variant="outlined"
        name="price"
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
        onChange={onChange}
      />
    </div>
  );

  const dioptriaInput: JSX.Element = (
    <div className="question">
      <p>¿Que dioptria es tu lente?</p>
      <TextField
        id="dioptria"
        label="Dioptria"
        variant="outlined"
        name="dioptria"
        onChange={onChange}
      />
    </div>
  );

  const radioGroups: Array<JSX.Element> = radioGroupContent.map(
    (radio_group: RadioGroupInterface) => {
      return (
        <div className="question" key={radio_group.question}>
          <p>{radio_group.question}</p>
          <RadioGroup
            firstVal={radio_group.firstVal}
            firstLabel={radio_group.firstLabel}
            secondVal={radio_group.secondVal}
            secondLabel={radio_group.secondLabel}
            onClick={radio_group.onClick}
          />
        </div>
      );
    },
  );

  const insumoInput: JSX.Element = (
    <div className="question">
      <p>¿Que otro insumo necesitas?</p>
      <TextField
        id="insumo"
        label="Insumo"
        variant="outlined"
        size="small"
        name="otherThing"
        onChange={onChange}
      />
    </div>
  );

  const RegisterButton: React.FC = () => (
    <div className="button">
      <ColorButton disabled={disabled} color="primary" onClick={() => onClick()}>
        Registrar
      </ColorButton>
    </div>
  );

  const modalContent: JSX.Element = (
    <div>
      <p style={{ padding: '2em 0' }}>Cirugia registrada con exito</p>
      <Button variant="contained" color="primary" onClick={() => router.push('/calendarSurgeries')}>
        Aceptar
      </Button>
    </div>
  );

  return (
    <div className="surgery-form">
      <p>Programar cirugía</p>
      <div className="form-card">
        <div className="surgery_data">
          <DoctorSelect />
          <SurgerySelect />
          {patientInput}
          {priceInput}
          {dioptriaInput}
          {radioGroups}
          {render && insumoInput}
        </div>
        <RegisterButton />
        <SimpleModal
          title="Registrar cirugia"
          content={modalContent}
          open={open}
          setOpen={(val: boolean) => setOpen(val)}
        />
      </div>
    </div>
  );
};

export default SurgeryData;
