import React, { Component } from "react";
import {
  ActionSheetIOS,
  CameraRoll,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from "react-native";

const EXAMPLES = [
  {
    title: "Single photo",
    description: "with caption, no grid button",
    enableGrid: false,
    alwaysDisplayStatusBar: true,
    media: [
      {
        photo:
          "http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg",
        caption: "Grotto of the Madonna"
      }
    ]
  },
  {
    title: "Multiple photos",
    description: "with captions and nav arrows",
    displayNavArrows: true,
    displayActionButton: true,
    media: [
      {
        photo:
          "http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg",
        selected: true,
        caption: "Grotto of the Madonna"
      },
      {
        photo: require("./media/broadchurch_thumbnail.png"),
        caption: "Broadchurch Scene"
      },
      {
        video:
          "https://18skyfiregce-vimeo.akamaized.net/exp=1517743733~acl=%2F179859217%2F%2A~hmac=6188baa05f7cfb07163952102f6c46bb5ca985a3c03e5ee40071ece9c66a260c/179859217/video/587282649,587282651,587282650,587282648/subtitles/4601116-English-en,4923171-Portugu%C3%AAs-pt/master.m3u8?external-subs=1",
        photo:
          "http://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg",
        thumb:
          "http://farm3.static.flickr.com/2449/4052876281_6e068ac860_q.jpg",
        selected: false,
        caption: "Beautiful Eyes"
      }
    ]
  },
  {
    title: "Library photos",
    description: "showing grid first, custom action method",
    startOnGrid: true,
    displayActionButton: true
  }
];

// fill 'Library photos' example with local media
CameraRoll.getPhotos({
  first: 30,
  assetType: "Photos"
})
  .then(data => {
    const media = [];
    data.edges.forEach(d =>
      media.push({
        photo: d.node.image.uri
      })
    );
    EXAMPLES[2].media = media;
  })
  .catch(error => alert(error));

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Photo Browser Examples"
  };

  _onSelectionChanged(media, index, selected) {
    alert(`${media.photo} selection status: ${selected}`);
  }

  _onActionButton(media, index) {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: media.photo,
          message: media.caption
        },
        () => {},
        () => {}
      );
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  }

  renderExampleRow = example => {
    const { navigate } = this.props.navigation;
    const { title, description } = example;

    return (
      <TouchableOpacity
        key={`example_${title}`}
        onPress={() => {
          navigate("Detail", {
            example
          });
        }}
      >
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {EXAMPLES.map(this.renderExampleRow)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 16
  },
  row: {
    flex: 1,
    padding: 8,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1
  },
  rowTitle: {
    fontSize: 14
  },
  rowDescription: {
    fontSize: 12
  }
});
