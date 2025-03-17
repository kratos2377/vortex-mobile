import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, useTheme } from 'react-native-paper';
import { format } from 'date-fns';

interface GameBetProps {
    id: string;
    gameName: string;
    betAmount: number;
    status: string;
    wonStatus: boolean;
    createdAt: Date;
    isGameValid: boolean;
  
}

const GameBetCard: React.FC<GameBetProps> = ({ id , gameName , betAmount , status , wonStatus , createdAt , isGameValid }) => {
  const theme = useTheme();
  
  // Determine status color
  const getStatusColor = () => {
    switch (status) {
      case 'In-Progress':
        return theme.colors.primary;
      case 'ToSettle':
        return "#dc9207";
      case 'Settled':
        return wonStatus ? "#35d00a" : theme.colors.error;
      default:
        return theme.colors.surfaceVariant;
    }
  };
  
  // Format bet amount to 2 decimal places with currency symbol
  const formattedAmount = `$${betAmount.toFixed(2)}`;
  
  // Format the creation date
  const formattedDate = format(new Date(createdAt), 'MMM d, yyyy • h:mm a');
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.gameName}>{gameName}</Text>
          <Badge
            style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
          >
            {status}
          </Badge>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>Bet Amount:</Text>
            <Text variant="bodyMedium" style={styles.value}>{formattedAmount}</Text>
          </View>
          
          {status === 'Settled' && (
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.label}>Outcome:</Text>
              <Text
                variant="bodyMedium"
                style={[
                  styles.value,
                  {
                    color: wonStatus ? "#35d00a" : theme.colors.error,
                    fontWeight: 'bold'
                  }
                ]}
              >
                {wonStatus ? 'Won' : 'Lost'}
              </Text>
            </View>
          )}
          
          {!isGameValid && status === 'Settled' && (
            <Text variant="bodySmall" style={styles.validityMessage}>
              Game ended due to disconnection
            </Text>
          )}
        </View>
        
        <Text variant="bodySmall" style={styles.timestamp}>
          {formattedDate}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameName: {
    flex: 1,
    fontWeight: '700',
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '500',
  },
  validityMessage: {
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  timestamp: {
    color: '#888',
    marginTop: 8,
  },
});

export default GameBetCard;