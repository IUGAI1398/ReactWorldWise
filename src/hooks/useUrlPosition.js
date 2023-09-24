import { useSearchParams } from 'react-router-dom';

export  function useUrlPosition() {
    const [searchParams] = useSearchParams();
    const currentLat = searchParams.get("lat");
    const currentLng = searchParams.get("lng");
    return [currentLat, currentLng];
}