/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';

import '../styles/index.scss'
import './layout.scss'
// @ts-ignore
import moon from '../images/moon.svg';
// @ts-ignore
import sun from '../images/sun.svg';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  // @ts-ignore
  EuiHeader,
  // @ts-ignore
  EuiHeaderSection,
  // @ts-ignore
  EuiHeaderSectionItem,
  // @ts-ignore
  EuiHeaderSectionItemButton,
  // @ts-ignore
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  // @ts-ignore
  EuiNavDrawerGroup,
  // @ts-ignore
  EuiNavDrawer,
  EuiHorizontalRule,
  // @ts-ignore
  EuiShowFor,
} from '@elastic/eui';

import { TopLinks } from './navigation_links/top_links';
import { SolutionLinks } from './navigation_links/solution_links';
import { ExploreLinks } from './navigation_links/explore_links';
import { AdminLinks } from './navigation_links/admin_links';

if (localStorage.getItem('isDarkTheme') === 'true') {
  require('../../node_modules/@elastic/eui/src/theme_dark.scss');
} else {
  require('../../node_modules/@elastic/eui/src/theme_light.scss');
}

export default class Layout extends React.Component<any, any> {

  navDrawerRef: any;
  initialTheme = localStorage.getItem('isDarkTheme') === 'true' ? true : false;

  constructor(props: any) {
    super(props);
    this.state = {
      isDarkTheme: this.initialTheme,
      themeIsLoading: false
    }
  }

  handleChangeTheme = () => {
    this.setState({
      isDarkTheme: !this.state.isDarkTheme,
      themeIsLoading: true
    }, () => {
      localStorage.setItem('isDarkTheme', this.state.isDarkTheme);
      window.location.reload();
    })
  }


  renderLogo() {
    return (
      <EuiHeaderLogo
        iconType="logoElastic"
        href="/#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => this.navDrawerRef.toggleOpen()}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Home',
        href: '#',
        onClick: (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          console.log('You clicked home');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  setNavDrawerRef = (ref: any) => (this.navDrawerRef = ref);
  
  render() {
    const themeIcon = this.state.isDarkTheme ? sun : moon;

    console.log(ExploreLinks);
    return (
      <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
        >
          <EuiHeader>
            <EuiHeaderSection grow={false}>
              <EuiShowFor sizes={['xs', 's']}>
                <EuiHeaderSectionItem border="right">
                  {this.renderMenuTrigger()}
                </EuiHeaderSectionItem>
              </EuiShowFor>
              <EuiHeaderSectionItem border="right">
                {this.renderLogo()}
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem border="right">
                {/* <HeaderSpacesMenu /> */}
              </EuiHeaderSectionItem>
            </EuiHeaderSection>

            {this.renderBreadcrumbs()}

            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem style={{display: 'flex', alignItems: 'center', width: '11rem', justifyContent: 'center', paddingLeft: '.5rem', paddingRight: '.5rem'}}>
                <EuiButton
                  size="s"
                  iconType={themeIcon}
                  onClick={() => this.handleChangeTheme()}
                  isLoading={this.state.themeIsLoading}
                >
                  Switch Theme
                </EuiButton>
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiNavDrawer ref={this.setNavDrawerRef}>
            <EuiNavDrawerGroup listItems={TopLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={ExploreLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={SolutionLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={AdminLinks} />
          </EuiNavDrawer>
          <div className="demoWrapper">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
