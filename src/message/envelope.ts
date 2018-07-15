export interface Envelope<V, T> {
	id: string;
	senderId?: string;
	transactionId?: string;
	payload: T;
	type: V;
}

export type EmptyEnvelope<V> = Envelope<V, undefined>;
