// App.test.tsx
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';

// Mock completo do react-native-vision-camera
jest.mock('react-native-vision-camera', () => {
  const mockCameraComponent = () => <></>;
  mockCameraComponent.requestCameraPermission = jest.fn(() =>
    Promise.resolve('granted'),
  );

  return {
    Camera: mockCameraComponent,
    getCameraDevice: () => ({id: 'mock-camera'}),
    useCameraDevices: () => ({back: {id: 'mock-camera'}}),
    useCodeScanner: () => jest.fn(),
  };
});

// Mock do Alert
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert = {
    alert: jest.fn(),
  };
  return RN;
});

describe('App', () => {
  it('renders correctly after permission is granted', async () => {
    const {getByText} = render(<App />);
    await waitFor(() =>
      expect(getByText('Point the camera at a code')).toBeTruthy(),
    );
  });
});
