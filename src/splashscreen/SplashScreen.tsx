import {
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ImageURISource,
  SafeAreaView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React from 'react';
import data from './splashdata';
import tw from '../lib/TailwindUtil';

interface prop {
  item: item;
  index: number;
}

interface item {
  id: number;
  mainText: string;
  subText1: string | null | undefined;
  subText2: string | null | undefined;
  subText3: string | null | undefined;
  subText4: string | null | undefined;
  logo: ImageURISource;
  divider: ImageURISource;
}

export default function SplashScreen() {
  const {width, height} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef<FlatList>(null);
  const renderItem = ({item}: prop) => {
    return (
      <SafeAreaView>
        <View
          style={tw`h-full w-[${width}px] flex items-center justify-center flex-1`}>
          <View>
            <Image
              resizeMode="center"
              source={item.logo}
              style={tw`h-[300px] w-[300px]`}
            />
            <Image
              resizeMode="center"
              source={item.divider}
              style={tw`w-[300px]`}
            />
            <View style={tw`flex items-center h-[30%]`}>
              <Text style={tw`text-[18px] font-extrabold text-black`}>
                {item.mainText}
              </Text>
              {item.subText1 && (
                <Text style={tw`font-bold`}>{item.subText1}</Text>
              )}
              {item.subText2 && (
                <Text style={tw`font-bold`}>{item.subText2}</Text>
              )}
              {item.subText4 && <Text>{'\n'}</Text>}
              {item.subText3 && (
                <Text style={tw`font-bold ${item.subText4! && 'bottom-6'}`}>
                  {item.subText3}
                </Text>
              )}
              {item.subText4 && (
                <Text style={tw`font-bold bottom-6`}>{item.subText4}</Text>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const Footer = () => {
    const indecatorStyle = 'h-[2.5px] w-[10px] bg-gray-400 mx-[3px] rounded-sm';
    return (
      <View style={tw`h-[30%] justify-between px-[20px]]`}>
        <View style={tw`flex flex-row justify-center mt-[20]`}>
          {/* <View style={tw`${indecatorStyle}`} /> */}
          {data.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  tw`${indecatorStyle}`,
                  currentIndex == index && tw`bg-main w-[25px]`,
                ]}
              />
            );
          })}
        </View>
        <View style={tw`mb-[20px]`}>
          <View style={tw`flex-row`}>
            {currentIndex == 0 ? (
              <TouchableOpacity
                style={[
                  tw`flex-1 h-[50px] rounded-md bg-white border-2 border-main justify-center items-center`,
                ]}>
                <Text style={tw`text-main`}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  tw`flex-1 h-[50px] rounded-md bg-white border-2 border-main justify-center items-center`,
                ]}
                onPress={() => MoveSlide('Back')}>
                <Text style={tw`text-main`}>Back</Text>
              </TouchableOpacity>
            )}

            <View style={tw`w-[15px]`} />
            <TouchableOpacity
              style={[
                tw`flex-1 h-[50px] rounded-md bg-main justify-center  items-center`,
              ]}
              onPress={() => MoveSlide('Next')}>
              <Text style={tw`text-white`}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const UpdateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const MoveSlide = (action: string) => {
    var slideIndex = null;
    switch (action) {
      case 'Next':
        slideIndex = currentIndex + 1;
        break;
      case 'Back':
        slideIndex = currentIndex - 1;
        break;
      default:
        break;
    }
    if (slideIndex != null && slideIndex != data.length) {
      const offset = slideIndex * width;
      scrollRef?.current?.scrollToOffset({offset});
      setCurrentIndex(slideIndex);
    }
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <FlatList
        ref={scrollRef}
        data={data}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{height: height * 0.75}}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={UpdateCurrentSlideIndex}
      />
      <Footer />
    </SafeAreaView>
  );
}
