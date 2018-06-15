import { Button, ButtonOrder, ButtonSize } from '../button';
import { Color } from '../colors';
import { Copy } from '../copy';
import { Headline } from '../headline';
import { Link } from '../link';
import { PropertyBox } from '../property-box';
import * as React from 'react';
import { Space, getSpace, SpaceSize } from '../space';
import styled from 'styled-components';

export interface TeaserProps {
	description: string;
	headline: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onPrimaryButtonClick?: React.MouseEventHandler<HTMLElement>;
	onSecondaryButtonClick?: React.MouseEventHandler<HTMLElement>;
	primaryButton?: string;
	secondaryButton?: string;
}

const OrangeToRed = `linear-gradient(to bottom right, ${Color.Orange}, ${Color.Red});`;

const StyledConnectLibrary = styled.div`
	box-sizing: border-box;
	padding: ${getSpace(SpaceSize.M)}px;
	color: ${Color.White};
`;

const StyledButton = styled(Button)`
	margin-top: 12px;
`;

export const Teaser: React.SFC<TeaserProps> = props => (
	<StyledConnectLibrary>
		<PropertyBox background={OrangeToRed}>
			<Headline order={3}>{props.headline}</Headline>
			<Copy>{props.description}</Copy>
			<Space sizeTop={SpaceSize.S} sizeBottom={SpaceSize.XS}>
				<StyledButton
					textColor={Color.Red}
					order={ButtonOrder.Primary}
					size={ButtonSize.Medium}
					onClick={props.onPrimaryButtonClick}
					inverted={true}
				>
					{props.primaryButton}
				</StyledButton>
			</Space>
			<Link onClick={props.onSecondaryButtonClick}>
				<Copy>{props.secondaryButton}</Copy>
			</Link>
		</PropertyBox>
	</StyledConnectLibrary>
);
