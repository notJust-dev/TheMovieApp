import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import MovieListItem from '@/components/MovieListItem';
import { fetchWatchlistMovies } from '@/api/watchlist';

export default function WatchList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchlistMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => <MovieListItem movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
