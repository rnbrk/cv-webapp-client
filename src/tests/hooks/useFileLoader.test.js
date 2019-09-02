import { act } from 'react-dom/test-utils';
import axios, { instance } from 'axios';

import { testHook } from '../testUtils';
import useFileLoader from '../../hooks/useFileLoader';

// Mock domain
const DOMAIN = `http://localhost:3000`;

// Mocking Axios
jest.mock('axios');

// Mocking DOM module
const blobUrlString = 'blob:http://localhost:8080/4458ac3a-9f55-4bfc-90ec-8f3897d66123';
window.URL.createObjectURL = () => blobUrlString;

// Runs an instance of fileLoader
let file, getFile, deleteFile;
beforeEach(() => {
  testHook(() => {
    act(() => {
      [file, getFile, deleteFile] = useFileLoader(DOMAIN);
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should have file property', () => {});

describe('fileLoader.get', () => {
  const url = '/users/39yt3yt387y89y98tgh3/photo';

  beforeEach(async () => {
    await act(async () => {
      await getFile(url);
    });
  });

  it('should exist on returned fileLoader object', () => {
    expect(typeof getFile).toBe('function');
  });

  it('should run axios instance with correct parameters', () => {
    expect(instance).toHaveBeenCalledTimes(1);

    expect(instance).toHaveBeenCalledWith({
      url,
      method: 'get',
      responseType: 'blob'
    });
  });

  it('should update fileLoader.file with blobUrl', () => {
    expect(file).toBe(blobUrlString);
  });
});

describe('fileLoader.delete', () => {
  const url = `/users/photo`;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(async () => {
    await act(async () => {
      await deleteFile(url, token);
    });
  });

  it('should exist on returned fileLoader object', () => {
    expect(typeof deleteFile).toBe('function');
  });

  it('should run axios instance', () => {
    expect(instance).toHaveBeenCalledTimes(1);
  });

  it('should set file to null', () => {
    expect(file).toBeNull();
  });
});
