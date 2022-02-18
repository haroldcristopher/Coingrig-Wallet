import apps from 'data/apps';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import CardList from 'components/CardList';
import {styles} from './styles';
import Separator from 'components/CardList/Separator';

const marketData = apps.filter(app => app.categories?.includes('market'));

export default function MarketTab() {
  const {t} = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <Separator title={'MODULES'} />
      <CardList
        data={marketData.filter(app => app.module)}
        title={null}
        category={null}
      />
      <Separator title={'EXTERNAL LINKS'} />
      <CardList
        data={marketData.filter(app => !app.module)}
        category={null}
        title={null}
      />
    </ScrollView>
  );
}
