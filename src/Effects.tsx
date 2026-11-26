import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const { sourceId } = props;
    const [state, setState] = useState<{ sourceId: string; message: string | number }>({
        sourceId,
        message: -1,
    });

    useEffect(() => {
        const callback = (message: string | number) => {
            setState({ sourceId, message });
        };

        subscribe(sourceId, callback);

        return () => {
            unsubscribe(sourceId, callback);
        };
    }, [sourceId]);

    // сообщение от прежнего источника не показываем
    const message = state.sourceId === sourceId ? state.message : -1;

    return (
        <div>
            {sourceId}: {message}
        </div>
    );
}