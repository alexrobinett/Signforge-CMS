import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useDecodedAuth from './useAuth';

// helper to create a basic unsigned JWT
const createToken = (payload) => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  return `${header}.${body}.`; // signature not needed for decoding
};

const payload = {
  UserInfo: { email: 'demo@test.com', userId: '123', name: 'Demo' },
};
const token = createToken(payload);

vi.mock('../app/context/AuthContext', () => ({
  useAuth: () => ({ token }),
}));

beforeEach(() => {
  localStorage.clear();
});

describe('useDecodedAuth', () => {
  it('returns decoded user data from JWT', () => {
    const { result } = renderHook(() => useDecodedAuth());
    expect(result.current.userID).toBe('123');
    expect(result.current.firstName).toBe('Demo');
    expect(result.current.email).toBe('demo@test.com');
    expect(JSON.parse(localStorage.getItem('userID'))).toBe('123');
  });
});
